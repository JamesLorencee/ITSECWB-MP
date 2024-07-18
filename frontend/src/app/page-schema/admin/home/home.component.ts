import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { MgmtService } from '../../../services/mgmt.service';
import { jwtDecode } from 'jwt-decode'; // Assuming jwt-decode is imported correctly
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class AdminHomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private mgmtService: MgmtService,
    private fb: FormBuilder,
  ) {}
  userList: any;

  // Modal variables
  isModalOpen = false;
  expenseID = 0;
  idNum = 0;

  editForm: FormGroup = this.fb.group({
    editName: [{ value: '-', disabled: true }],
    editRole: new FormControl<boolean | null>(false),
  });
  editID: string = '';

  deactForm: FormGroup = this.fb.group({
    deactName: [{ value: '-', disabled: true }],
    deactEmail: [{ value: '-', disabled: true }],
    deactRole: [{ value: '-', disabled: true }],
  });
  deactID: string = '';
  deactHeader: string = '';
  deactIcon: string = '';

  filterVal: any;

  ngOnInit() {
    this.viewUsers();
  }

  viewUsers() {
    this.mgmtService.getUsers().subscribe((res) => {
      this.userList = res.userList;
    });
  }

  changeList(role: string) {
    this.filterVal = role;

    if (this.filterVal !== '') {
      this.mgmtService.getUsersByRole(this.filterVal).subscribe((res) => {
        this.userList = res.userList;
      });
    } else {
      this.viewUsers();
    }
  }

  toggleModal(idNum: number, isModalOpen?: boolean, uid?: any) {
    if (isModalOpen != null) this.isModalOpen = isModalOpen;
    else this.isModalOpen = !this.isModalOpen;
    this.idNum = idNum;

    if (idNum === 1) {
      //Edit
      this.editUser(uid!);
    } else if (idNum === 2) {
      //Deactivate
      this.deactHeader = 'Deactivate User';
      this.deactIcon = 'matVisibilityOffOutline';
      this.deactUser(uid!);
    } else if (idNum === 3) {
      //Reactivate
      this.deactHeader = 'Activate User';
      this.deactIcon = 'matVisibilityOutline';
      this.deactUser(uid!);
    }
  }

  editUser(uid: any) {
    this.mgmtService.getUserByID(uid).subscribe((res) => {
      var edit = res.user;
      this.editForm.setValue({
        editName: edit.name,
        editRole: edit.isAdmin,
      });
      this.editID = edit.id;
    });
  }

  saveEdit(uid: any) {
    this.authService.compareRole(true).subscribe((role) => {
      if (role) {
        this.mgmtService.saveEdit(uid).subscribe(() => {
          this.toggleModal(0, false);
          this.editForm.reset();
          this.viewUsers();
        });
      }
    });
  }

  deactUser(uid: any) {
    this.mgmtService.getUserByID(uid).subscribe((res) => {
      var deact = res.user;
      var deactRole = '';
      if (deact.isAdmin) {
        deactRole = 'Admin';
      } else {
        deactRole = 'User';
      }
      this.deactForm.setValue({
        deactName: deact.name,
        deactEmail: deact.email,
        deactRole: deactRole,
      });
      this.deactID = deact.id;
    });
  }

  saveDeact(uid: any) {
    this.authService.compareRole(true).subscribe((role) => {
      if (role) {
        this.mgmtService.saveDeact(uid).subscribe(() => {
          this.toggleModal(0, false);
          this.deactForm.reset();
          this.viewUsers();
        });
      }
    });
  }
}
