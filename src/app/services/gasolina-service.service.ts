import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {GasolinasResult} from "../interfaces/gasolina.interface";


const gasUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class GasolinaServiceService {

  constructor(private http:HttpClient) { }

  getGasolinas(code:string):Observable<GasolinasResult>{
    const url:string = `${gasUrl}/getGasoline/${code}`
    return this.http.get<GasolinasResult>(url)
  }



}