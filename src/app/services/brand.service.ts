import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:8080/api/brands';

  constructor(private http: HttpClient) { }

  // GET
  getBrands(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addBrand(brand: Brand): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(brand), { headers: headers });
  }

}
