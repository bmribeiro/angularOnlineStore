import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAttribute } from '../models/ProductAttribute';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  private apiUrl = 'http://localhost:8080/api/attribute-options';

  constructor(private http: HttpClient) { }

  // GET
  getProductAttributes(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addProductAttribute(productAttribute: ProductAttribute): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(productAttribute), { headers: headers });
  }

}
