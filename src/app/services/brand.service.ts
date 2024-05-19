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
  addEl(brand: Brand): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(brand), { headers: headers });
  }

  // GET BY ID
  editEl(brandId: number) {
    return this.http.get<Brand>(`${this.apiUrl}/${brandId}`);
  }

  // UPDATE
  updateEl(brand: Brand) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Brand>(this.apiUrl, JSON.stringify(brand), { headers });
  }

  // DELETE
  deleteEl(brandId: number) {
    return this.http.delete(`${this.apiUrl}/${brandId}`);
  }


}
