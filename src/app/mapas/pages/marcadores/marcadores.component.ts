import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface MarcadorColor {
  color:string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
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
      .list-group{
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 50;
      }
      li{
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements OnInit, AfterViewInit {
  // view child nos permitira tener multiples instancias de mapas sin necesidad de repetir un id
  @ViewChild('mapa')  divMapa!: ElementRef
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-99.04662591276502, 19.606137393805422]

  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // se construye aqui el elemento porque tenemos acceso al html creado
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.leerMarcadoresLocalStorage()
  }

  AgregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const actualCenter = this.map.getCenter()

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(actualCenter)
      .addTo(this.map)

    this.marcadores.push({ color,marker: newMarker})

    this.guardarMarcadoresLocalStorage()
    newMarker.on('dragend', () => {
      this.guardarMarcadoresLocalStorage()
    })
  }

  irAMarcador(marcador:mapboxgl.Marker) {

    // this.map.setCenter(marcador.getLngLat())
    this.map.flyTo({
      center: marcador.getLngLat(),
      zoom: 18,
    })
  }

  guardarMarcadoresLocalStorage(){
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach(m => {
      const color = m.color
      const { lng, lat } = m.marker!.getLngLat()

      lngLatArr.push({ color, centro: [lng,lat]})
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }

  leerMarcadoresLocalStorage(){
    if (!localStorage.getItem('marcadores')){
      return
    }
    const lngLatArr:MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.map)

      this.marcadores.push({
        marker: newMarker, color: m.color,
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage()
      })
    })

  }

  borrarMarcador(index:number) {
    this.marcadores[index].marker?.remove()
    this.marcadores.splice(index,1)
    this.guardarMarcadoresLocalStorage()
  }

}
