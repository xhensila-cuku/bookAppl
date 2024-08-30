import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import { AlertModalComponent } from '../log-in/alert-modal/alert-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertModalComponent,
    RegisterModalComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  onLogin() {
    this.router.navigate(['login']);
  }

  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.form = this.fb.group({
      Username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const loginData = this.form.value;
    console.log('login Data:', loginData);

    this.registerService.signup(loginData).subscribe({
      next: (resData) => console.log(resData),
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      },
      complete: () => console.log('Registration completed'),
    });

    this.form.reset();
  }
  onHandleError() {
    this.errorMessage = null;
  }
}
