import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MunicipalitiesResponse, Municipality} from "../interfaces/municipality.interface";
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


  async GetMunicipalitiesAsync(state_id:number = 0):Promise<Municipality[]>{
    const url:string = `${gasUrl}/getMunicipalities?stateId=${state_id}`

    return  new Promise((resolve) => {
      fetch(url).then( resp => resp.json())
        .then(body => {
          resolve(body.results)
        })
    });
  }




}
