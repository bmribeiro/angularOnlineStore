import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductItemImage } from '../models/ProductItemImage';

@Injectable({
  providedIn: 'root'
})
export class ProductItemImageService {

  private apiUrl = 'http://localhost:8080/api/product-item-images';

  constructor(private http : HttpClient) { }

  // GET by ProductItem
  getProductImagesByProductItem(productItemId : number){
    return this.http.get<ProductItemImage>(`${this.apiUrl}/product-item/${productItemId}`);
  }
}
