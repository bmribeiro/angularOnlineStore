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
  addEl(productAttribute: ProductAttribute): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(productAttribute), { headers: headers });
  }

  // GET BY ID
  editEl(productAttributeId: number) {
    return this.http.get<ProductAttribute>(`${this.apiUrl}/${productAttributeId}`);
  }

  // UPDATE
  updateEl(productAttribute: ProductAttribute) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<ProductAttribute>(this.apiUrl, JSON.stringify(productAttribute), { headers });
  }

  // DELETE
  deleteEl(productAttributeId: number) {
    return this.http.delete(`${this.apiUrl}/${productAttributeId}`);
  }

}
