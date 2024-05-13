import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/ProductItem';
import { ProductVariation } from '../models/ProductVariation';

@Injectable({
  providedIn: 'root'
})
export class ProductVariationService {

  private apiUrl = 'http://localhost:8080/api/product-variations';

  constructor(private http: HttpClient) { }

  // GET
  getProductVariations(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addProductVariation(productVariation: ProductVariation): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(productVariation), { headers: headers });
  }
}
