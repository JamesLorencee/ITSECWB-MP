import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  isAdmin: boolean = false;

  // User Pages
  expenseLog() {
    this.router.navigate(['../dashboard'], { relativeTo: this.activatedRoute });
  }
  incomeLog() {
    this.router.navigate(['../incomeLog'], { relativeTo: this.activatedRoute });
  }
  generateReport() {
    this.router.navigate(['../generateReport'], { relativeTo: this.activatedRoute });
  }

  // Admin Pages
  userMgmt() {
    this.router.navigate(['../dashboard'], { relativeTo: this.activatedRoute });
  }

  userLogs() {
    this.router.navigate(['../logs'], { relativeTo: this.activatedRoute });
  }

  systemSettings() {
    this.router.navigate(['../settings'], { relativeTo: this.activatedRoute });
  }

  logout() {
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }
}
