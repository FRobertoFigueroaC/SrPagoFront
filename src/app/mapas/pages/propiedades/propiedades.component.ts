import { Component, OnInit } from '@angular/core';

interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
  img: string;
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styles: [
  ]
})
export class PropiedadesComponent {

  propiedades: Propiedad[] = [
    {
      titulo: 'Casa residencial, Canadá',
      descripcion: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466],
      img: 'https://thumbs.dreamstime.com/z/casa-de-lujo-la-medida-en-las-afueras-de-toronto-canad%C3%A1-94150439.jpg',
    },
    {
      titulo: 'Casa de playa, México',
      descripcion: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748],
      img: 'https://q-ec.bstatic.com/images/hotel/max1024x768/107/107927131.jpg',
    },
    {
      titulo: 'Apartamento, Argentina',
      descripcion: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ],
      img: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/84/e9/4f/getlstd-property-photo.jpg',
    },
    {
      titulo: 'Local comercial, España',
      descripcion: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ],
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfGOnumamxoRl-YmaLvqKie3wlAtnE7BzHNg&usqp=CAU',
    },
  ]

}
