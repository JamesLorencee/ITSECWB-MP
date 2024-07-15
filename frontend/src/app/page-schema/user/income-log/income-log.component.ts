import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { IncomeService } from '../../../services/income.service';
import { jwtDecode } from 'jwt-decode'; // Assuming jwt-decode is imported correctly
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-log',
  templateUrl: './income-log.component.html',
  styleUrl: './income-log.component.scss',
})
export class IncomeLogComponent {
  constructor(
    private authService: AuthService,
    private incomeService: IncomeService,
    private fb: FormBuilder,
  ) {}
  uid: string = '';
  incomeList: any;
  categoryList: any;
  editID: string = '';

  // Modal variables
  isModalOpen = false;
  expenseID = 0;
  idNum = 0;
  submitted = false;

  addForm: FormGroup = this.fb.group({
    addDate: ['', Validators.required],
    addAmt: ['', Validators.required],
    addSrc: ['', Validators.required],
  });

  editForm: FormGroup = this.fb.group({
    editDate: ['', Validators.required],
    editAmt: ['', Validators.required],
    editSrc: ['', Validators.required],
  });

  ngOnInit() {
    const accessToken = this.authService.getAccessToken();
    const decoded: any = jwtDecode(accessToken!);
    console.log(decoded);
    this.uid = decoded.userId;

    this.viewIncome();
  }

  toggleModal(idNum: number, isModalOpen?: boolean, incomeID?: string) {
    if (isModalOpen != null) this.isModalOpen = isModalOpen;
    else this.isModalOpen = !this.isModalOpen;
    this.idNum = idNum;

    if (idNum == 2) {
      //Edit Modal
      this.editIncome(incomeID!);
      console.log(incomeID);
    }
  }

  viewIncome() {
    this.incomeService.getIncome(this.uid).subscribe((res) => {
      console.log(res);
      if (res.incomeList.length > 0) {
        this.incomeList = res.incomeList;
      }
      this.categoryList = res.categoryList;
    });
  }

  addIncome() {
    this.submitted = true;
    if (this.addForm.valid) {
      console.log(this.addForm.value);
      this.incomeService
        .addIncome(
          this.uid,
          this.addForm.get(['addDate'])!.value,
          this.addForm.get(['addAmt'])!.value,
          this.addForm.get(['addSrc'])!.value,
        )
        .subscribe(() => {
          this.toggleModal(1, false);
          this.addForm.reset();
          this.viewIncome();
        });
    }
  }

  deleteIncome(incomeID: string) {
    console.log(incomeID);
    this.incomeService.deleteIncome(incomeID).subscribe(() => {
      this.viewIncome();
    });
  }

  editIncome(incomeID: string) {
    this.incomeService.editIncome(incomeID).subscribe((res) => {
      var edit = res.editIncome;
      this.editForm.setValue({
        editDate: edit.incomeDate,
        editAmt: edit.incomeAmt,
        editSrc: edit.incomeSource,
      });
      console.log(res);
      this.editID = edit.incomeID;
    });
  }

  saveIncome(incomeID: string) {
    this.submitted = true;
    if (this.editForm.valid) {
      this.incomeService
        .saveIncome(
          this.uid,
          this.editForm.get(['editDate'])!.value,
          this.editForm.get(['editAmt'])!.value,
          this.editForm.get(['editSrc'])!.value,
          incomeID,
        )
        .subscribe(() => {
          this.toggleModal(2, false);
          this.editForm.reset();
          this.viewIncome();
        });
    }
  }
}
