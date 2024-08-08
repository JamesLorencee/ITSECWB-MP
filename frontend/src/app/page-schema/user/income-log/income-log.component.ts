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
    private incomeService: IncomeService,
    private fb: FormBuilder,
  ) {}
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
    addAmt: ['', [Validators.required, Validators.pattern('^d{1,8}(.d{1,2})?$'), Validators.maxLength(36)]],
    addSrc: ['', Validators.required],
  });

  editForm: FormGroup = this.fb.group({
    editDate: ['', Validators.required],
    editAmt: ['', [Validators.required, Validators.pattern('^d{1,8}(.d{1,2})?$'), Validators.maxLength(36)]],
    editSrc: ['', Validators.required],
  });

  ngOnInit() {
    this.viewIncome();
  }

  toggleModal(idNum: number, isModalOpen?: boolean, incomeID?: string) {
    if (isModalOpen != null) this.isModalOpen = isModalOpen;
    else this.isModalOpen = !this.isModalOpen;
    this.idNum = idNum;

    if (idNum == 2) {
      //Edit Modal
      this.editIncome(incomeID!);
    }
  }

  viewIncome() {
    this.incomeService.getIncome().subscribe((res) => {
      if (res.incomeList.length > 0) {
        this.incomeList = res.incomeList;
      }
      this.categoryList = res.categoryList;
    });
  }

  addIncome() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.incomeService
        .addIncome(
          this.addForm.get(['addDate'])!.value,
          this.addForm.get(['addAmt'])!.value,
          this.addForm.get(['addSrc'])!.value,
        )
        .subscribe(() => {
          this.toggleModal(1, false);
          this.addForm.reset();
          this.submitted = false;
          this.viewIncome();
        });
    }
  }

  deleteIncome(incomeID: string) {
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
      this.editID = edit.incomeID;
    });
  }

  saveIncome(incomeID: string) {
    this.submitted = true;
    if (this.editForm.valid) {
      this.incomeService
        .saveIncome(
          this.editForm.get(['editDate'])!.value,
          this.editForm.get(['editAmt'])!.value,
          this.editForm.get(['editSrc'])!.value,
          incomeID,
        )
        .subscribe(() => {
          this.toggleModal(2, false);
          this.editForm.reset();
          this.submitted = false;
          this.viewIncome();
        });
    }
  }
}
