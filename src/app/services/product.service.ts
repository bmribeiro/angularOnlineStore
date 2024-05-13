import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  // GET
  getProducts(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addProduct(product: Product, file: File): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('product', JSON.stringify(product));

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(product), { });
  }

}
