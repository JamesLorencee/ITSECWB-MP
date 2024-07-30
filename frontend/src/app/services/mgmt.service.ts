import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MgmtService {
  private baseUrl = 'https://localhost:3000/mgmt';
  private token = '';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`, { withCredentials: true });
  }

  getUsersByRole(role: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/${role}`, { withCredentials: true });
  }

  getLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logs`, { withCredentials: true });
  }

  getUserByID(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${userId}`, { withCredentials: true });
  }

  saveEdit(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/role/${userId}`, {}, { withCredentials: true });
  }

  saveDeact(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/active/${userId}`, {}, { withCredentials: true });
  }
}
