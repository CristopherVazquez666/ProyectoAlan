import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const user = localStorage.getItem('access_token');

@Injectable({
  providedIn: 'root'
})
export class CandyService {
  
  constructor( private _http: HttpClient ){}

  addCandy(candyObject:any){
    return this._http.post(`/api/candy/create`, candyObject, { headers: {'Authorization': `Bearer ${user}`}});
  }
  getCategories(){
    return this._http.get(`/api/categorie/getCategories`, { headers: {'Authorization': `Bearer ${user}`}});
  }
}
