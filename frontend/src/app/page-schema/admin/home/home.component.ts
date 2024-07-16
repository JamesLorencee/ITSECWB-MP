import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { MgmtService } from '../../../services/mgmt.service';
import { jwtDecode } from 'jwt-decode'; // Assuming jwt-decode is imported correctly

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
  ) {}
  userList: any;

  ngOnInit() {
    this.viewUsers();
  }

  viewUsers() {
    this.mgmtService.getUsers().subscribe((res) => {
      console.log(res);
      this.userList = res.userList;
    });
  }
}
