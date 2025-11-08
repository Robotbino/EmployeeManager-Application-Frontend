import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest, AuthService } from '../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone:false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent implements OnInit {
 loginData: AuthenticationRequest = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;
  returnUrl: string = '/home';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the returnUrl from query params or default to '/home'
    const returnUrlParam = this.route.snapshot.queryParams['returnUrl'];
    this.returnUrl = returnUrlParam ? decodeURIComponent(returnUrlParam) : '/home';
    console.log('Return URL:', this.returnUrl);
  }

  onLogin(): void {
  console.log("This is your", this.loginData);
  this.errorMessage = '';
  this.isLoading = true;
  
  // Check token before login
  console.log('Token before login:', localStorage.getItem('auth_token'));
  console.log('Is authenticated before login?', this.authService.isAuthenticated());
  
  this.authService.authenticate(this.loginData).subscribe({
    next: (response) => {
      console.log('Login successful', response);
      this.isLoading = false;
      
      // Check immediately after response
      console.log('Token after login:', localStorage.getItem('auth_token'));
      console.log('Token from service:', this.authService.getToken());
      console.log('Is authenticated after login?', this.authService.isAuthenticated());
      
      // Navigate
      console.log('Attempting to navigate to:', this.returnUrl);
      this.router.navigateByUrl(this.returnUrl).then(
        (success) => {
          console.log('Navigation result:', success);
          // Check again after navigation attempt
          console.log('Is still authenticated?', this.authService.isAuthenticated());
        },
        (error) => console.log('Navigation failed:', error)
      );
    },
    error: (error) => {
      console.error('Login failed', error);
      this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
      this.isLoading = false;
    }
  });
}
}
