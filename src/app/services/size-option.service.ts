import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeCategory } from '../models/SizeCategory';
import { SizeOption } from '../models/SizeOption';
import fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SizeOptionService {

  private apiUrl = 'http://localhost:8080/api/size-options';

  constructor(private http: HttpClient) { }

  // GET
  getSizeOptions(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addEl(sizeOption: SizeOption): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(sizeOption), { headers: headers });
  }

  // GET BY ID
  editEl(sizeOptionId: number) {
    return this.http.get<SizeOption>(`${this.apiUrl}/${sizeOptionId}`);
  }

  // UPDATE
  updateEl(sizeOption: SizeOption) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SizeOption>(this.apiUrl, JSON.stringify(sizeOption), { headers });
  }

  // DELETE
  deleteEl(attributeOptionId: number) {
    return this.http.delete(`${this.apiUrl}/${attributeOptionId}`);
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
