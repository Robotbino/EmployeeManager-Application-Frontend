import { Component } from '@angular/core';
import { AuthenticationRequest, AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone:false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
 loginData: AuthenticationRequest = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.authenticate(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.isLoading = false;
        // Redirect to dashboard or home page after successful login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }
}
