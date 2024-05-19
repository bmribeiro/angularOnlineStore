import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeCategory } from '../models/SizeCategory';
import fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SizeCategoryService {
  private apiUrl = 'http://localhost:8080/api/size-categories';

  constructor(private http: HttpClient) { }

  // GET
  getSizeCategories(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addEl(sizeCategory: SizeCategory): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(sizeCategory), { headers: headers });
  }

  // GET BY ID
  editEl(sizeCategoryId: number) {
    return this.http.get<SizeCategory>(`${this.apiUrl}/${sizeCategoryId}`);
  }

  // UPDATE
  updateEl(sizeCategoryId: SizeCategory) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SizeCategory>(this.apiUrl, JSON.stringify(sizeCategoryId), { headers });
  }

  // DELETE
  deleteEl(sizeCategoryId: number) {
    return this.http.delete(`${this.apiUrl}/${sizeCategoryId}`);
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
