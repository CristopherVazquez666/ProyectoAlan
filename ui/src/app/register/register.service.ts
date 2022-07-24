import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class RegisterService {
  constructor(private _http: HttpClient) { }

  singup(data:any){
    return this._http.post('/api/customer/create',data);
  }

}
