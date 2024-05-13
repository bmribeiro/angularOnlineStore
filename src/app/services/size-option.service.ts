import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeCategory } from '../models/SizeCategory';
import { SizeOption } from '../models/SizeOption';

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
  addSizeOption(sizeOption: SizeOption): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(sizeOption), { headers: headers });
  }
}
