import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, { email, password });
  }

  signout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePhoto', file, file.name);
    return this.http.post(`${this.baseUrl}/api/upload`, formData);
  }
}
