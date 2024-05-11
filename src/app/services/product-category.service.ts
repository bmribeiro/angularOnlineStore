import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl = 'http://localhost:8080/api/product-categories';


  constructor(private http: HttpClient) { }

  // GET
  getProductCategories(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((response: any[]) => {
        return response.map(category => {
          return {
            productCategoryId: category.productCategoryId,
            categoryName: category.categoryName,
            categoryImage: category.categoryImage,
            categoryDescription: category.categoryDescription,
            sizeCategory: category.sizeCategory,
            parentProductCategory: category.parentProductCategory
          };
        });
      })
    );
  }

  // POST
  addProductCategory(productCategory: ProductCategory): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(productCategory), { headers: headers });
  }


}
