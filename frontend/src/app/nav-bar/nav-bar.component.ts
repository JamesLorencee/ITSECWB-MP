import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  ) {}
  expenseLog() {
    this.router.navigate(['../dashboard'], { relativeTo: this.activatedRoute });
  }
  incomeLog() {
    this.router.navigate(['../incomeLog'], { relativeTo: this.activatedRoute });
  }
  generateReport() {
    this.router.navigate(['../generateReport'], { relativeTo: this.activatedRoute });
  }
  logout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
