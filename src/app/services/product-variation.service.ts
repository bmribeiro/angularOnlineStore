import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/ProductItem';
import { ProductVariation } from '../models/ProductVariation';
import fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ProductVariationService {

  private apiUrl = 'http://localhost:8080/api/product-variations';

  constructor(private http: HttpClient) { }

  // GET
  getProductVariations(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // GET by ProductItem
  getProductVariationsByProductItem(productItemId : number){
    return this.http.get<ProductVariation>(`${this.apiUrl}/productItem/${productItemId}`);
  }

  // POST
  addEl(productVariation: ProductVariation): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(productVariation), { headers: headers });
  }


  // GET BY ID
  editEl(attributeOptionId: number) {
    return this.http.get<ProductVariation>(`${this.apiUrl}/${attributeOptionId}`);
  }

  // UPDATE
  updateEl(productVariation: ProductVariation) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<ProductVariation>(this.apiUrl, JSON.stringify(productVariation), { headers });
  }

  // DELETE
  deleteEl(productVariationId: number) {
    return this.http.delete(`${this.apiUrl}/${productVariationId}`);
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
