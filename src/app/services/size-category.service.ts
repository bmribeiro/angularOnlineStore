import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeCategory } from '../models/SizeCategory';

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
  addSizeCategory(sizeCategory: SizeCategory): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(sizeCategory), { headers: headers });
  }

}
