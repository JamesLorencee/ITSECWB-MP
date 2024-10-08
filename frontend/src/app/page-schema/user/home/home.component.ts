import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ExpenseService } from '../../../services/expense.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Assuming jwt-decode is imported correctly
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class UserHomeComponent {
  constructor(
    private authService: AuthService,
    private expenseService: ExpenseService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  // Default Variables
  expenseList: any;
  categoryList: any;
  editID: string = '';

  // Modal Variables
  isModalOpen = false;
  expenseID = 0;
  idNum = 0;
  submitted = false;

  addForm: FormGroup = this.fb.group({
    addItem: ['', [Validators.required, Validators.maxLength(36)]],
    addSrc: ['', Validators.required],
    addDate: ['', Validators.required],
    addAmt: ['', [Validators.required, Validators.min(0), Validators.max(99999999.99)]],
  });

  editForm: FormGroup = this.fb.group({
    editItem: ['', [Validators.required, Validators.maxLength(36)]],
    editSrc: ['', Validators.required],
    editDate: ['', Validators.required],
    editAmt: ['', [Validators.required, Validators.min(0), Validators.max(99999999.99)]],
  });

  ngOnInit() {
    this.viewExpense();
  }

  toggleModal(idNum: number, isModalOpen?: boolean, expenseID?: string) {
    if (isModalOpen != null) this.isModalOpen = isModalOpen;
    else this.isModalOpen = !this.isModalOpen;
    this.idNum = idNum;

    if (idNum == 2) {
      this.editExpense(expenseID!);
    }
  }

  viewExpense() {
    this.expenseService.getExpense().subscribe((res) => {
      if (res.expenseList.length > 0) {
        this.expenseList = res.expenseList;
      }
      this.categoryList = res.categoryList;
    });
  }

  addExpense() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.expenseService
        .addExpense(
          this.addForm.get(['addDate'])!.value,
          this.addForm.get(['addItem'])!.value,
          this.addForm.get(['addAmt'])!.value,
          this.addForm.get(['addSrc'])!.value,
        )
        .subscribe(() => {
          this.toggleModal(1, false);
          this.addForm.reset();
          this.submitted = false;
          this.viewExpense();
        });
    }
  }

  editExpense(expenseID: string) {
    this.expenseService.editExpense(expenseID).subscribe((res) => {
      var edit = res.editExpense;
      this.editForm.setValue({
        editDate: edit.expenseDate,
        editItem: edit.expenseItem,
        editAmt: edit.expenseAmt,
        editSrc: edit.expenseSource,
      });
      this.editID = edit.expenseID;
    });
  }

  saveExpense(expenseID: string) {
    this.submitted = true;
    if (this.editForm.valid) {
      this.expenseService
        .saveExpense(
          this.editForm.get(['editDate'])!.value,
          this.editForm.get(['editItem'])!.value,
          this.editForm.get(['editAmt'])!.value,
          this.editForm.get(['editSrc'])!.value,
          expenseID,
        )
        .subscribe(() => {
          this.toggleModal(2, false);
          this.editForm.reset();
          this.viewExpense();
        });
    }
  }

  deleteExpense(expenseID: string) {
    this.expenseService.deleteExpense(expenseID).subscribe(() => {
      this.viewExpense();
    });
  }

  // USER LOGOUT DO NOT TOUCH!
  logout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
