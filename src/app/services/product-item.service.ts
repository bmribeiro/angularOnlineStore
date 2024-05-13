import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/ProductItem';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  private apiUrl = 'http://localhost:8080/api/product-items';

  constructor(private http: HttpClient) { }

  // GET
  getProductItems(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addProductItem(productItem: ProductItem, file: File): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('productItem', JSON.stringify(productItem));

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(productItem), {});
  }
}
