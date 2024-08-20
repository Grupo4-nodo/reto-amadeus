import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'users', userData);
  }

  checkIfUserExits(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `users?email=${email}`);
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }

  editUser(email: string, payload: Partial<User>): Observable<User> {
    return this.http.patch<User>(this.apiUrl + `users?email=${email}`, payload);
  }
}
