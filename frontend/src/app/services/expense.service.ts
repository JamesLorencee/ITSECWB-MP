import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://localhost:3000/expenseLogs';
  private token = '';

  constructor(private http: HttpClient) { }

  getExpense(uid: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${uid}`);
  }

  addExpense(uid: string, expenseDate: Date, expenseItem: string, expenseAmt: number, expenseSrc: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${uid}`, {
      expenseDate: expenseDate,
      expenseItem: expenseItem,
      expenseAmt: expenseAmt,
      expenseSrc: expenseSrc,
    });
  }

  editExpense(expenseID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${expenseID}`);
  }

  saveExpense(uid: string, expenseDate: Date, expenseItem: string, expenseAmt: number, expenseSrc: string, expenseID: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, {
      uid: uid,
      expenseDate: expenseDate,
      expenseItem: expenseItem,
      expenseAmt: expenseAmt,
      expenseSrc: expenseSrc,
      expenseID: expenseID,
    });
  }

  deleteExpense(expenseID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${expenseID}`);
  }
}
