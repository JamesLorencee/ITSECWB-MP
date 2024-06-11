import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private token = '';

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
    let formData: any = new FormData();
    Object.keys(userData.controls).forEach((formControlName) => {
      if (formControlName == 'photoProfile')
        formData.append(formControlName, userData.get(formControlName).value, formControlName);
      else formData.append(formControlName, userData.get(formControlName).value);
    });
    return this.http.post(`${this.baseUrl}/signup`, formData);
  }

  // upload(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('profilePhoto', file, file.name);
  //   return this.http.post(`${this.baseUrl}/api/upload`, formData, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: 'Bearer ' + this.token,
  //     }),
  //   });
  // }

  // saveImg(photoFileName: string, email: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/saveImg`, { photoFileName, email });
  // }
}
