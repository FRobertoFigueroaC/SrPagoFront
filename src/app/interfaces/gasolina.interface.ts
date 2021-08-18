export interface GasolinasResult {
  success: boolean;
  results: Gasolina[];
}

export interface Gasolina {
  _id:               string;
  calle:             string;
  rfc:               string;
  date_insert:       Date;
  regular:           string;
  colonia:           string;
  numeropermiso:     string;
  fechaaplicacion:   string;
  "\ufeffpermisoid": string;
  longitude:         string;
  latitude:          string;
  premium:           string;
  razonsocial:       string;
  codigopostal:      string;
  dieasel:           string;
}
