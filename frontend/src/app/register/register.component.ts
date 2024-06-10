import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted: boolean = false;
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.minLength(11),
            Validators.maxLength(11),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        profilePhoto: [null, Validators.required],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  upload() {
    this.submitted = true;
    const file = this.registerForm.get('profilePhoto')?.value;
    console.log(file);

    if (file) {
      this.authService.upload(file).subscribe({
        next: (response) => {
          console.log(response)
          this.onSubmit(response.filePath);
        },
        error: (error) => {
          console.error('Error uploading profile photo:', error);
        },
      });
    }
  }

  onSubmit(filePath: string) {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    console.log(this.registerForm.value)
    this.authService.signup({...this.registerForm.value, "photoFileName": filePath}).subscribe({
      next: (response) => {
        this.successMessage = response.message;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const valid = ['image/png', 'image/jpeg', 'image/jpg'];

      // invalid file type
      if (!valid.includes(file.type)) {
        return;
      }

      this.registerForm.patchValue({
        profilePhoto: file,
      });
    }
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      const errors = matchingControl.errors || {};

      if (errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ ...errors, mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
