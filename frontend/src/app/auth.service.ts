import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { env } from './environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${env.baseUrl}auth`;

  constructor(private http: HttpClient) {}

  //done
  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, { email, password }, { withCredentials: true });
  }

  //done
  signout(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`, { withCredentials: true });
  }

  compareRole(role: boolean): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/authenticate/${role}`, { withCredentials: true }).pipe(
      catchError((error) => {
        return of(false);
      }),
      (value) => {
        return value;
      },
    );
  }

  //done
  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/is-logged-in`, { withCredentials: true }).pipe(
      catchError((error) => {
        return of(false);
      }),
      (value) => {
        return value;
      },
    );
  }

  //done
  signup(userData: any): Observable<any> {
    let formData: any = new FormData();
    Object.keys(userData.controls).forEach((formControlName) => {
      if (formControlName == 'photoProfile')
        formData.append(formControlName, userData.get(formControlName).value, formControlName);
      else formData.append(formControlName, userData.get(formControlName).value);
    });
    return this.http.post(`${this.baseUrl}/signup`, formData);
  }
}
