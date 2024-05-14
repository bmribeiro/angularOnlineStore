import { Injectable } from '@angular/core';
import { AttributeOption } from '../models/AttributeOption';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeOptionService {

  private apiUrl = 'http://localhost:8080/api/attribute-options';

  constructor(private http: HttpClient) { }

  // GET
  getAttributeOptions(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<AttributeOption[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addAttributeOption(attributeOption: AttributeOption): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<AttributeOption>(this.apiUrl, JSON.stringify(attributeOption), { headers: headers });
  }

  // GET BY ID
  editElement(attributeOptionId: number) {
    return this.http.get<AttributeOption>(`${this.apiUrl}/${attributeOptionId}`);
  }

  // UPDATE
  updateAttributeOption(attributeOption: AttributeOption) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AttributeOption>(this.apiUrl, JSON.stringify(attributeOption), { headers });
  }

  // DELETE
  deleteAttributeOption(attributeOptionId: number){
    return this.http.delete(`${this.apiUrl}/${attributeOptionId}`);
  }

}
