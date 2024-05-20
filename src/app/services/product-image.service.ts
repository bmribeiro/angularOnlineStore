import { Injectable } from '@angular/core';
import { ProductImage } from '../models/ProductImage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private apiUrl = 'http://localhost:8080/api/product-images';

  constructor(private http : HttpClient) { }

  // GET by ProductItem
  getProductImagesByProductItem(productItemId : number){
    return this.http.get<ProductImage>(`${this.apiUrl}/product-item/${productItemId}`);
  }
}
