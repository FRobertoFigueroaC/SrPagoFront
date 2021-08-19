import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {State, StateResponse} from "../interfaces/state.iterface";
import {Observable} from "rxjs";

const gasUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http:HttpClient) { }

  getStates():Observable<StateResponse>{
    const url:string = `${gasUrl}/getStates`
    return this.http.get<StateResponse>(url)
  }

  async GetStatesAsycn():Promise<State[]>{
    const url:string = `${gasUrl}/getStates`
    return  new Promise((resolve) => {
       fetch(url).then( resp => resp.json())
        .then(body => {
          // console.log(body.results)
          resolve(body.results)
        })
    });
  }
}
