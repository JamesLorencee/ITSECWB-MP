import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
  ) {}

  isAdmin: boolean = false;
  user: any;
  imageUrl: any;

  ngOnInit() {
    this.authService.compareRole(true).subscribe((isAdmin) => {
      this.isAdmin = isAdmin.same;
    });
    this.authService.getUser().subscribe((res) => {
      console.log(res);
      this.user = res.user;
      this.authService.getImage(this.user.photoFileName).subscribe((blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    });
  }

  // User Pages
  expenseLog() {
    this.router.navigate(['../dashboard'], { relativeTo: this.activatedRoute });
  }
  incomeLog() {
    this.router.navigate(['../incomeLog'], { relativeTo: this.activatedRoute });
  }

  // Admin Pages
  userMgmt() {
    this.router.navigate(['../dashboard'], { relativeTo: this.activatedRoute });
  }

  userLogs() {
    this.router.navigate(['../logs'], { relativeTo: this.activatedRoute });
  }

  logout() {
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
