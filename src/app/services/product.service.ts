import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import fileSaver from 'file-saver';

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

  // GET BY CategoryId
  getProductsByCategory(categoryId: number): Observable<any[]> {

    // Solicitação HTTP GET
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  // POST
  addEl(product: Product): Observable<Product> {

    // Solicitação HTTP POST
    return this.http.post<Product>(this.apiUrl, product, {});
  }

  // GET BY ID
  editEl(productCategoryId: number) {
    return this.http.get<Product>(`${this.apiUrl}/${productCategoryId}`);
  }

  // UPDATE
  updateEl(product: Product) {

    // Solicitação HTTP PUT
    return this.http.put<Product>(this.apiUrl, product, {});
  }

  // DELETE
  deleteEl(productId: number) {
    return this.http.delete(`${this.apiUrl}/${productId}`);
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
