import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private baseUrl = 'http://localhost:3000/incomeLogs';
  private token = '';

  constructor(private http: HttpClient) {}

  getIncome(uid: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${uid}`);
  }

  addIncome(uid: string, incomeDate: Date, incomeAmt: number, incomeSrc: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${uid}`, {
      incomeDate: incomeDate,
      incomeAmt: incomeAmt,
      incomeSrc: incomeSrc,
    });
  }

  deleteIncome(incomeID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${incomeID}`);
  }

  editIncome(incomeID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${incomeID}`);
  }

  saveIncome(uid: string, incomeDate: Date, incomeAmt: number, incomeSrc: string, incomeID: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, {
      uid: uid,
      incomeDate: incomeDate,
      incomeAmt: incomeAmt,
      incomeSrc: incomeSrc,
      incomeID: incomeID,
    });
  }
}
