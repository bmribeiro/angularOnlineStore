import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../models/ProductCategory';
import fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl = 'http://localhost:8080/api/product-categories';


  constructor(private http: HttpClient) { }

  // GET
  getProductCategories(criteria?: any): Observable<any[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let params = new HttpParams();
    if (criteria) {
      Object.keys(criteria).forEach(key => {
        params = params.set(key, criteria[key]);
      });
    }

    return this.http.get<any[]>(this.apiUrl, { headers, params }).pipe(
      map((response: any[]) => {
        return response.map(category => {
          return {
            productCategoryId: category.productCategoryId,
            categoryName: category.categoryName,
            categoryImage: category.categoryImage,
            imageBytes: category.imageBytes,
            categoryDescription: category.categoryDescription,
            sizeCategory: category.sizeCategory,
            parentProductCategory: category.parentProductCategory
          };
        });
      })
    );
  }

  // POST
  addEl(productCategory: ProductCategory, file: File): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    const formData: FormData = new FormData();
    if(file != undefined){
      formData.append('file', file);
    }
    formData.append('productCategory', JSON.stringify(productCategory));

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, formData, {});
  }

  // GET BY ID
  editEl(productCategoryId: number) {
    return this.http.get<ProductCategory>(`${this.apiUrl}/${productCategoryId}`);
  }

  // UPDATE
  updateEl(productCategory: ProductCategory, file: File) {

    const formData: FormData = new FormData();
    if(file != undefined){
      formData.append('file', file);
    }
    formData.append('productCategory', JSON.stringify(productCategory));

    return this.http.put<ProductCategory>(this.apiUrl, formData, { });
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
