import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {GasolinaServiceService} from "../../../services/gasolina-service.service";
import {Gasolina, GasolinasResult} from "../../../interfaces/gasolina.interface";
import {MarcadorColor} from "../../../interfaces/marcardor.interface";



@Component({
  selector: 'app-gasolina-form',
  templateUrl: './gasolina-form.component.html',
  styleUrls: ['./gasolina-form.component.css']
})
export class GasolinaFormComponent implements OnInit, AfterViewInit {
  // view child nos permitira tener multiples instancias de mapas sin necesidad de repetir un id

  @ViewChild('mapa')  divMapa!: ElementRef
  map!: mapboxgl.Map;


  lngLat:[number, number] =[-99.13342539732879,19.43224981046549];

  gasolinas: Gasolina[] = [];

  marcadores: MarcadorColor[] = [];

  constructor(private gasService:GasolinaServiceService) { }

  ngOnInit(): void {
    this.SearchGas();
  }
  ngAfterViewInit(): void {
    // se construye aqui el elemento porque tenemos acceso al html creado

    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 13,
    });
  }

  SearchGas(){
    this.DeleteMarkers();
    this.gasolinas = [];
    this.gasService.getGasolinas('06010')
      .subscribe(response => this.ProcessResults(response))
  }

  ProcessResults (gasResult: GasolinasResult) {
    this.gasolinas = gasResult.results;
    this.gasolinas.forEach(gasolina => {
      const lat = gasolina.latitude;
      const long = gasolina.longitude
      this.AddMarker([long,lat])
    })
  }

  AddMarker(position:[string, string]) {

    const lngLat:[number, number] = [Number(position[0]),Number(position[1])]
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: false,
      color,
    })
      .setLngLat(lngLat)
      .addTo(this.map)


    this.marcadores.push({ color,marker: newMarker})
  }

  DeleteMarkers(){
    if (this.marcadores.length > 0){
      this.marcadores.forEach(marker => {
        marker.marker?.remove();
      })
    }
  }

  GoToMarker(marcador:mapboxgl.Marker) {

    // this.map.setCenter(marcador.getLngLat())
    this.map.flyTo({
      center: marcador.getLngLat(),
      zoom: 18,
    })
  }

}
