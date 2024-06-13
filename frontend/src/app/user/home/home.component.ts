import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class UserHomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  logout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
