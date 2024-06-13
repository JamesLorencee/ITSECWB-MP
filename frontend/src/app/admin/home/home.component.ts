import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class AdminHomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  logout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
