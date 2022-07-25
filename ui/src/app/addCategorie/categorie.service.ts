import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const user = localStorage.getItem('token');
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

constructor( private _http: HttpClient ) { }
  addCategorie(categorieObject:any){
    return this._http.post(`/api/categorie/create`, categorieObject, { headers: {'Authorization': `Bearer ${user}`}});
  }
}
