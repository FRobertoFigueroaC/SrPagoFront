// Angular
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// Libraries
import * as mapboxgl from "mapbox-gl";
// Services
import {GasolinaServiceService} from "../../../services/gasolina-service.service";
import {MunicipalitiesService} from "../../../services/municipalities.service";
import {StatesService} from "../../../services/states.service";
// Interfaces
import {Gasolina, GasolinasResult} from "../../../interfaces/gasolina.interface";
import {MarcadorColor} from "../../../interfaces/marcardor.interface";
import {Municipality} from "../../../interfaces/municipality.interface";
import {State} from "../../../interfaces/state.iterface";


@Component({
  selector: 'app-gasolina-form',
  templateUrl: './gasolina-form.component.html',
  styles: [
    `
      .mapa-container{
        height: 300px;
        width: 90%;
      }
    `
  ]
})
export class GasolinaFormComponent implements OnInit, AfterViewInit {
  // Mapa
  @ViewChild('mapa')  divMapa!: ElementRef
  map!: mapboxgl.Map;
  lngLat:[number, number] =[-99.13342539732879,19.43224981046549];
  public marcadores: MarcadorColor[] = [];
  // Tabla -Gasolina
  public gasolinas: Gasolina[] = [];
  // Combos - Estados y Municipios
  public states:State[] = [];
  public municipalities:Municipality[] = [];
  // form
  form:FormGroup = this.fb.group({
    state_id: ['',],
    cp: ['', Validators.required],
  })


  constructor(private fb:FormBuilder,
              private gasService:GasolinaServiceService,
              private stateService:StatesService,
              private municipalityService:MunicipalitiesService) { }

  ngOnInit(): void {
    this.GetSates()
    this.GetMunicipalities(0)

    this.form.get('state_id')?.valueChanges
      .subscribe(state_id => {
        this.form.get('cp')?.reset('')
        this.GetMunicipalities(state_id)
      })
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
    if (this.form.valid){
      this.DeleteMarkers();
      this.gasolinas = [];
      this.gasService.getGasolinas(this.form.get('cp')?.value)
        .subscribe(response => this.ProcessResults(response))
    }
  }

  GetSates(){
    this.stateService.getStates()
      .subscribe(states => {
        this.states = states.results;
      })
  }

  GetMunicipalities(state_id:number = 0){
    this.municipalityService.getMunicipalities(state_id)
      .subscribe(municipalities => {
        this.municipalities = municipalities.results
      })
  }

  ProcessResults (gasResult: GasolinasResult) {
    this.gasolinas = gasResult.results;
    this.gasolinas.forEach(gasolina => {
      const lat = gasolina.latitude;
      const long = gasolina.longitude
      this.AddMarker([long,lat])
    })
    const markerCenter = this.marcadores[0].marker?.getLngLat();
    this.map.setCenter([markerCenter!.lng,markerCenter!.lat]);

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
