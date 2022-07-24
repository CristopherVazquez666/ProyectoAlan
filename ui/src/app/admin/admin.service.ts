import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class AdminService {
    public apiUrl = environment.apiURL;

    constructor( private _http: HttpClient) { }

    getCategories() {
        return this._http.get(`${this.apiUrl}/categorie/getCategories`, { headers: { 'content-Type': 'application/json' /*'Authorization': `Bearer ${this.user}`*/ } });
    }
}