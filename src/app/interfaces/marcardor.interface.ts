import * as mapboxgl from "mapbox-gl";

export interface MarcadorColor {
  color:string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}
