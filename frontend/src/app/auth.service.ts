import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private token = '';

  constructor(private http: HttpClient) {}

  //done
  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, { email, password }).pipe(
      tap((val: any) => {
        localStorage.setItem('accessToken', val.accessToken);
        localStorage.setItem('refreshToken', val.refreshToken);
      }),
    );
  }

  //done
  signout(): void {
    const token = this.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete<any>(`${this.baseUrl}/logout`, { headers: headers }).subscribe(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    });
  }

  //done
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  //done
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  compareRole(role: boolean): Observable<boolean> {
    var token = this.getAccessToken();
    var headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<boolean>(`${this.baseUrl}/authenticate/${role}`, { headers: headers }).pipe(
      catchError((error) => {
        if (error.error.error == 'expired_token') {
          return this.http.post<any>(`${this.baseUrl}/token`, { refreshToken: this.getRefreshToken() }).pipe(
            mergeMap((value) => {
              localStorage.setItem('accessToken', value.accessToken);
              token = this.getAccessToken();

              headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
              return this.http.get<boolean>(`${this.baseUrl}/authenticate/${role}`, { headers: headers }).pipe(
                (value) => {
                  return value;
                },
                catchError((error) => {
                  return of(false);
                }),
              );
            }),
          );
        } else {
          return of(false);
        }
      }),
    );
  }

  //done
  isLoggedIn(): Observable<boolean> {
    var token = this.getAccessToken();
    var headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    if (!token) {
      return of(false);
    }
    return this.http.get<boolean>(`${this.baseUrl}/is-logged-in`, { headers: headers }).pipe(
      catchError((error) => {
        if (error.error.error == 'expired_token') {
          return this.http.post<any>(`${this.baseUrl}/token`, { refreshToken: this.getRefreshToken() }).pipe(
            mergeMap((value) => {
              localStorage.setItem('accessToken', value.accessToken);
              token = this.getAccessToken();

              headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
              return this.http.get<boolean>(`${this.baseUrl}/is-logged-in`, { headers: headers }).pipe(
                (value) => {
                  return value;
                },
                catchError((error) => {
                  return of(false);
                }),
              );
            }),
          );
        } else {
          return of(false);
        }
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
