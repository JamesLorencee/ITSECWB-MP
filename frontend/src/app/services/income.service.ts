import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private baseUrl = 'https://localhost:3000/incomeLogs';

  constructor(private http: HttpClient) {}

  getIncome(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`, { withCredentials: true });
  }

  addIncome(incomeDate: Date, incomeAmt: number, incomeSrc: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/add/`,
      {
        incomeDate: incomeDate,
        incomeAmt: incomeAmt,
        incomeSrc: incomeSrc,
      },
      { withCredentials: true },
    );
  }

  deleteIncome(incomeID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${incomeID}`, { withCredentials: true });
  }

  editIncome(incomeID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${incomeID}`, { withCredentials: true });
  }

  saveIncome(incomeDate: Date, incomeAmt: number, incomeSrc: string, incomeID: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/`,
      {
        incomeDate: incomeDate,
        incomeAmt: incomeAmt,
        incomeSrc: incomeSrc,
        incomeID: incomeID,
      },
      { withCredentials: true },
    );
  }
}
