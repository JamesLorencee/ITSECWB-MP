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
    const file = this.registerForm.get('profilePhoto')?.value;
    console.log(file);

    if (file) {
      this.authService.upload(file).subscribe({
        next: (response) => {
          this.registerForm.patchValue({ photoFileName: response.filePath });
          this.onSubmit();
        },
        error: (error) => {
          console.error('Error uploading profile photo:', error);
        },
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('phoneNumber', this.registerForm.get('phone')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append(
      'photoFileName',
      this.registerForm.get('photoFileName')?.value
    );
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.authService.signup(formData).subscribe({
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
