import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { validateFile } from '../validators/validators';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^((?:[A-Za-z0-9!#$%&\'*+\\-\\/=?^_`{|}~]|(?<=^|\\.)"|"(?=$|\\.|@)|(?<=".*)[ .](?=.*")|(?<!\\.)\\.){1,64})(@)((?:[A-Za-z0-9.\\-])*(?:[A-Za-z0-9])\\.(?:[A-Za-z0-9]){2,})$',
            ),
          ],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{12,64}$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
        profilePhoto: [null, [Validators.required, validateFile()]],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      },
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    this.authService.signup(this.registerForm).subscribe({
      next: (res) => {
        console.log('hi');
        this.successMessage = res.message;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.successMessage = err.error.error.message;
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    this.registerForm.patchValue({
      profilePhoto: file,
    });
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
