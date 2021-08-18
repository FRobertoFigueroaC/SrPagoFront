import { Component, OnInit } from '@angular/core';

interface MenuItem{
  ruta: string,
  nombre: string,
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent{

  menuItems:MenuItem[] =[
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FULLSCREEN'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'ZOOM RANGE'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'MARCADORES'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'PROPIEDADES'
    }
  ]
}
