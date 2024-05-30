import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../models/ProductCategory';
import fileSaver from 'file-saver';
import { CategoryImage } from '../models/CategoryImage';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl = 'http://localhost:8080/api/product-categories';

  constructor(private http: HttpClient) { }

  // GET
  getProductCategories(criteria?: any): Observable<ProductCategory[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let params = new HttpParams();
    if (criteria) {
      Object.keys(criteria).forEach(key => {
        params = params.set(key, criteria[key]);
      });
    }

    return this.http.get<ProductCategory[]>(this.apiUrl, { headers, params }).pipe(
      map((response: ProductCategory[]) => {
        return response.map(category => {
          return {
            productCategoryId: category.productCategoryId,
            categoryName: category.categoryName,
            categoryDescription: category.categoryDescription,
            sizeCategory: category.sizeCategory,
            parentProductCategory: category.parentProductCategory,
            categoryImages: category.categoryImages
          } as ProductCategory;
        });
      })
    );
  }

  // POST
  addEl(productCategory: ProductCategory): Observable<any> {

    // Solicitação HTTP POST
    return this.http.post<ProductCategory>(this.apiUrl, productCategory, {});
  }

  // GET BY ID
  editEl(productCategoryId: number) {
    return this.http.get<ProductCategory>(`${this.apiUrl}/${productCategoryId}`);
  }

  // UPDATE
  updateEl(productCategory: ProductCategory) {

    // Solicitação HTTP POST
    return this.http.put<ProductCategory>(this.apiUrl, JSON.stringify(productCategory), {});
  }

  // DELETE
  deleteEl(productCategoryId: number) {
    return this.http.delete(`${this.apiUrl}/${productCategoryId}`);
  }

  downloadExcel(): void {
    this.http.get(`${this.apiUrl}/excel`, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        fileSaver.saveAs(data, 'excel.xlsx');
      });
  }

  downloadPdf(): void {
    this.http.get(`${this.apiUrl}/pdf`, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        fileSaver.saveAs(data, 'pdf.pdf');
      });
  }

}
