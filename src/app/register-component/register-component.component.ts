import { Component } from '@angular/core';
import { AuthService, RegisterRequest } from '../auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-component',
  standalone:false,
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {

  registerData: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    this.errorMessage = '';
    this.isLoading = true;
    console.log("Register button clicked");
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.isLoading = false;
        // Redirect to dashboard or home page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
