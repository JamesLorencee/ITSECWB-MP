import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class AdminHomeComponent {
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.signout();
  }
}
