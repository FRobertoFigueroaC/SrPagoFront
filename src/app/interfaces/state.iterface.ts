export interface StateResponse {
  success: boolean;
  results: State[];
}

export interface State {
  id:         number;
  name:       string;
  created_at: Date;
  updated_at: Date;
}
