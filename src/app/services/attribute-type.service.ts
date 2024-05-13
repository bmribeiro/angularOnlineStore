import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttributeType } from '../models/AttributeType';

@Injectable({
  providedIn: 'root'
})
export class AttributeTypeService {

  private apiUrl = 'http://localhost:8080/api/attribute-types';

  constructor(private http: HttpClient) { }

  // GET
  getAttributeTypes(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addAttributeType(attributeType: AttributeType): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(attributeType), { headers: headers });
  }
}
