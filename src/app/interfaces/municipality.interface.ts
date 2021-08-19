export interface MunicipalitiesResponse {
  success: boolean;
  results: Municipality[];
}

export interface Municipality {
  id:         number;
  name:       string;
  cp:         string;
  state_id:   number;
  created_at: Date;
  updated_at: Date;
}
