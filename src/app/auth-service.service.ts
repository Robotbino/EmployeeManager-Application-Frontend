import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  access_token: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Register a new user
   */
  public register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiServerUrl}/api/v1/auth/register`,
      request
    ).pipe(
      tap(response => this.handleAuthenticationSuccess(response))
    );
  }

  /**
   * Authenticate an existing user
   */
  public authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiServerUrl}/api/v1/auth/authenticate`,
      request
    ).pipe(
      tap(response => this.handleAuthenticationSuccess(response))
    );
  }

  /**
   * Store token and update subject
   */
 private handleAuthenticationSuccess(response: AuthenticationResponse): void {
  if (response.access_token) {
    localStorage.setItem('auth_token', response.access_token);
    this.tokenSubject.next(response.access_token);
  }
}

  

  /**
   * Get stored token from localStorage
   */
  private getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Get current token value
   */
  public getToken(): string | null {
    return this.tokenSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Logout user
   */
  public logout(): void {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
  }
}