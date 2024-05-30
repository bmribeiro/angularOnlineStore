import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/ProductItem';
import { Colour } from '../models/Colour';

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

  // GET
  getProductItemsByProduct(productId: number): Observable<any[]> {

    // Solicitação HTTP GET
    return this.http.get<ProductItem[]>(`${this.apiUrl}/product/${productId}`);
  }

  // GET Colours
  getColoursByProductId(productId: number): Observable<Colour[]> {
    return this.http.get<Colour[]>(`${this.apiUrl}/product/${productId}/colours`);
  }

  // POST
  addEl(productItem: ProductItem): Observable<ProductItem> {
    
    // Solicitação HTTP POST
    return this.http.post<ProductItem>(this.apiUrl, productItem, {});
  }

  // GET BY ID
  editEl(productItemId: number) {
    return this.http.get<ProductItem>(`${this.apiUrl}/${productItemId}`);
  }

  // UPDATE
  updateEl(productItem: ProductItem) {

    return this.http.put<ProductItem>(this.apiUrl, productItem, {});
  }

  // DELETE
  deleteEl(productItemId: number) {
    return this.http.delete(`${this.apiUrl}/${productItemId}`);
  }

}
