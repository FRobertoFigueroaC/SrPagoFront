import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        height: 100%;
        width: 100%;
      }
      .row{
        width: 450px;
        background-color: white;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        z-index: 50;
      }
    `
  ]
})
export class ZoomRangeComponent implements OnInit, AfterViewInit, OnDestroy {

  // view child nos permitira tener multiples instancias de mapas sin necesidad de repetir un id
  @ViewChild('mapa')  divMapa!: ElementRef
  map!: mapboxgl.Map;

  zoomLevel: number = 14;
  center: [number, number] = [-99.04662591276502, 19.606137393805422]

  constructor() {}

  ngAfterViewInit(): void {
    // se construye aqui el elemento porque tenemos acceso al html creado
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    // listener para zoom
    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom()
    })
    // rango
    this.map.on('zoomend', (event) => {
      if (this.map.getZoom()> 18){
        this.map.zoomTo(18)
      }
    })
    // movimiento del mapa
    this.map.on('move', (event) => {
      const {lng, lat} = event.target.getCenter()
      this.center = [lng, lat]
    })
  }

  ngOnInit(): void {}

  zoomOut() {
    this.map.zoomOut();
  }
  zoomIn() {
    this.map.zoomIn();
  }
  zoomChange(valor:string){
    this.map.zoomTo(Number(valor))

  }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {})
    this.map.off('zoomend', () => {})
    this.map.off('move', () => {})
  }

}
