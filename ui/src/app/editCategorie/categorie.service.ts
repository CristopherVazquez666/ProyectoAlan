import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const user = localStorage.getItem('token');
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

constructor( private _http: HttpClient ) { }
  updateCategorie(categorieObject:any, id:any){
    return this._http.put(`/api/categorie/update/${id}`, categorieObject, { headers: {'Authorization': `Bearer ${user}`}});
  }
  getCategorie(id:any){
    return this._http.get(`/api/categorie/getCategorie/${id}`, { headers: {'Authorization': `Bearer ${user}`}});
  }
}
