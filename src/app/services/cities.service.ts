import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  citySend:string = 'Alguna ciudad';

  getCities() {
    return this.http.get(this.apiUrl+'cities')
  }

  updateCity(id: number, item: any): Observable<any> {
    const url = `${this.apiUrl}/cities/${id}`;
    return this.http.put(url, item);
  }
}

