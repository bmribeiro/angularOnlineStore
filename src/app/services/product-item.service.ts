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
  addEl(productItem: ProductItem, file: File): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('productItem', JSON.stringify(productItem));

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, formData, {});
  }

  // GET BY ID
  editEl(productItemId: number) {
    return this.http.get<ProductItem>(`${this.apiUrl}/${productItemId}`);
  }

  // UPDATE
  updateEl(productItem: ProductItem, file: File) {

    const formData: FormData = new FormData();
    if (file != undefined) {
      formData.append('file', file);
    }
    formData.append('productItem', JSON.stringify(productItem));

    return this.http.put<ProductItem>(this.apiUrl, formData, {});
  }

  // DELETE
  deleteEl(productItemId: number) {
    return this.http.delete(`${this.apiUrl}/${productItemId}`);
  }

}
