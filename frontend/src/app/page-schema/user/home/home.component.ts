import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class UserHomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  // Default Variables
  isModalOpen = false;
  expenseID = 0;
  idNum = 0;
  submitted = false;

  // TO UPDATE: Call categorylist
  categories: string[] = [
    'Food & Drinks',
    'Transportation',
    'Shopping',
    'Financial Expenses',
    'Housing & Utilities',
    'Others',
  ];

  addForm: FormGroup = this.fb.group({
    addItem: ['', Validators.required],
    addCategory: ['', Validators.required],
    addDate: ['', Validators.required],
    addPrice: ['', Validators.required],
  });

  toggleModal(idNum: number, isModalOpen?: boolean, expenseID?: number) {
    if (isModalOpen != null) this.isModalOpen = isModalOpen;
    else this.isModalOpen = !this.isModalOpen;
    this.idNum = idNum;
  }

  logout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
