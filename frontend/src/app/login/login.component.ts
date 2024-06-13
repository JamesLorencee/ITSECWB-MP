import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  // standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  value: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    console.log(this.authService.getAccessToken());
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signin(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        const accessToken = this.authService.getAccessToken();
        if (!accessToken) {
          return;
        }

        const decoded: any = jwtDecode(accessToken);
        const isAdmin = decoded.isAdmin;

        if (isAdmin) {
          this.router.navigate(['/admin']); // Redirect admin to admin dashboard
        } else {
          this.router.navigate(['/user']); // Redirect user to user dashboard
        }
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Error:', error);
      },
    });
  }
}
