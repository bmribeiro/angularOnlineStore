import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:8080/api/brands';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('user:28cefdc8-1de9-4e91-80e4-4e5b1f86cb5f')
    });
    
    // Solicitação HTTP com Auth
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }
}
