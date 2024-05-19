import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colour } from '../models/Colour';

@Injectable({
  providedIn: 'root'
})
export class ColourService {
  private apiUrl = 'http://localhost:8080/api/colours';

  constructor(private http: HttpClient) { }

  // GET
  getColours(): Observable<any[]> {

    const headers = new HttpHeaders({
    });

    // Solicitação HTTP GET
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  // POST
  addEl(colour: Colour): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Solicitação HTTP POST
    return this.http.post<any>(this.apiUrl, JSON.stringify(colour), { headers: headers });
  }

  // GET BY ID
  editEl(attributeOptionId: number) {
    return this.http.get<Colour>(`${this.apiUrl}/${attributeOptionId}`);
  }

  // UPDATE
  updateEl(colour: Colour) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Colour>(this.apiUrl, JSON.stringify(colour), { headers });
  }

  // DELETE
  deleteEl(colourId: number) {
    return this.http.delete(`${this.apiUrl}/${colourId}`);
  }

}
