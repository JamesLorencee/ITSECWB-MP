import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseUrl = 'https://localhost:3000/expenseLogs';
  private token = '';

  constructor(private http: HttpClient) {}

  getExpense(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`, { withCredentials: true });
  }

  addExpense(expenseDate: Date, expenseItem: string, expenseAmt: number, expenseSrc: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/add`,
      {
        expenseDate: expenseDate,
        expenseItem: expenseItem,
        expenseAmt: expenseAmt,
        expenseSrc: expenseSrc,
      },
      { withCredentials: true },
    );
  }

  editExpense(expenseID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${expenseID}`, { withCredentials: true });
  }

  saveExpense(
    expenseDate: Date,
    expenseItem: string,
    expenseAmt: number,
    expenseSrc: string,
    expenseID: string,
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/`,
      {
        expenseDate: expenseDate,
        expenseItem: expenseItem,
        expenseAmt: expenseAmt,
        expenseSrc: expenseSrc,
        expenseID: expenseID,
      },
      { withCredentials: true },
    );
  }

  deleteExpense(expenseID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${expenseID}`, { withCredentials: true });
  }
}
