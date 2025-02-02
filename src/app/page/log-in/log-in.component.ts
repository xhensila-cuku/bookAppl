import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginService } from '../../core/services/login.service';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AlertModalComponent,
  ],
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService 
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loginData = this.form.value;
    console.log('login Data:', loginData);

    this.loginService.login(loginData).subscribe({
      next: (resData) => {
        console.log(resData);
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.id);
        this.authService.login(resData.role);
        this.checkUserRoles(resData.role);
        console.log(resData.id);
        this.form.reset();
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.error('Login failed', error);
      },
    });
  }

  private checkUserRoles(roles: string[]) {
    if (this.authService.isAdmin()) {
      console.log('admin');
      this.router.navigate(['/admin']);
    } else if (this.authService.isUser()) {
      console.log('regular user');
      this.router.navigate(['/page']);
    } else {
      this.errorMessage = 'Access denied';
    }
  }

  onHandleError() {
    this.errorMessage = null;
  }

  OnRegister() {
    this.router.navigate(['register']);
  }
}

