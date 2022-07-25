import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const user = localStorage.getItem('token');
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

constructor( private _http: HttpClient ) { }
  getCategories(){
    return this._http.get(`/api/categorie/getCategories`, { headers: {'Authorization': `Bearer ${user}`}});
  }
  deleteCategories(id:any){
    return this._http.delete(`/api/categorie/delete/${id}`, { headers: {'Authorization': `Bearer ${user}`}});
  }
}
