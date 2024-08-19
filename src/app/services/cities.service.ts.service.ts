import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }


  getCities() {
    return this.http.get(this.apiUrl+'cities')
  }
}
