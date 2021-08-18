import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import * as mapboxgl from "mapbox-gl";
import {GasolinaServiceService} from "../../../services/gasolina-service.service";
import {Gasolina} from "../../../interfaces/gasolina.interface";


@Component({
  selector: 'app-gasolina-form',
  templateUrl: './gasolina-form.component.html',
  styleUrls: ['./gasolina-form.component.css']
})
export class GasolinaFormComponent implements OnInit, AfterViewInit {
  // view child nos permitira tener multiples instancias de mapas sin necesidad de repetir un id
  // @ViewChild('mapa')  divMapa!: ElementRef
  // map!: mapboxgl.Map;
  // zoomLevel: number = 15;
  // center: [number, number] = [-99.04662591276502, 19.606137393805422]


  gasolinas: Gasolina[] = [];



  constructor(private gasService:GasolinaServiceService) { }

  ngOnInit(): void {
    this.SearchGas();
  }

  SearchGas(){
    console.log('searching')
    this.gasService.getGasolinas('99260')
      .subscribe(response => {
        this.gasolinas = response.results;
        console.log(response)
      })
  }

  ngAfterViewInit(): void {
    // se construye aqui el elemento porque tenemos acceso al html creado

    // this.map = new mapboxgl.Map({
    //   container: this.divMapa.nativeElement,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: this.center,
    //   zoom: this.zoomLevel,
    // });
  }

}
