import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const user = localStorage.getItem('access_token');

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public apiUrl = environment.apiURL;
  
  constructor(
    private _http: HttpClient,
  ){ 
  }

  getCandies(query:any): Observable<any>{
    return this._http.post<any>(`/api/candy/getCandies`, query, { headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${user}` }});
  }
  getCategories(){
    return this._http.get(`/api/categorie/getCategories`, { headers: {'Authorization': `Bearer ${user}`}});
  }
  getUser(){
    return this._http.get(`/api/customer/validate`, { headers: {'Authorization': `Bearer ${user}`}});
  }
}
