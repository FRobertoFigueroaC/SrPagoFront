import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MunicipalitiesResponse} from "../interfaces/municipality.interface";
import {Observable} from "rxjs";

const gasUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MunicipalitiesService {

  constructor(private http:HttpClient) { }

  getMunicipalities(state_id:number = 0): Observable<MunicipalitiesResponse> {
    const url:string = `${gasUrl}/getMunicipalities`
    const params = {
      stateId: state_id,
    }
    return this.http.get<MunicipalitiesResponse>(url,{
      params,
    })
  }
}
