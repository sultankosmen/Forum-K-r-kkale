import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private token = signal<string | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly user = computed(() => this.currentUser());

  constructor() {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      this.token.set(storedToken);
      this.currentUser.set(JSON.parse(storedUser));
    }
  }
  // Login
  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Simüle edilmiş login - gerçek uygulamada HTTP isteği yapılacak
    return new Observable(observer => {
      setTimeout(() => {
        // Basit simülasyon - username: "demo", password: "demo123"
        if (credentials.username === 'demo' && credentials.password === 'demo123') {
          const mockUser: User = {
            id: 1,
            username: credentials.username,
            email: 'demo@example.com',
            createdAt: new Date('2024-01-01'),
            entryCount: 5,
            favoriteCount: 12
          };

          const mockToken = 'mock_jwt_token_' + Date.now();
          const response: AuthResponse = {
            token: mockToken,
            user: mockUser
          };

          this.token.set(mockToken);
          this.currentUser.set(mockUser);
          localStorage.setItem('auth_token', mockToken);
          localStorage.setItem('auth_user', JSON.stringify(mockUser));

          observer.next(response);
          observer.complete();
        } else {
          observer.error(new Error('Kullanıcı adı veya şifre hatalı'));
        }
      }, 500);
    });
  }

  // Register
  register(data: RegisterRequest): Observable<AuthResponse> {
    // Şifre kontrolü
    if (data.password !== data.confirmPassword) {
      return throwError(() => new Error('Şifreler eşleşmiyor'));
    }
    // Simüle edilmiş kayıt
    return new Observable(observer => {
      setTimeout(() => {
        const mockUser: User = {
          id: Date.now(),
          username: data.username,
          email: data.email,
          createdAt: new Date(),
          entryCount: 0,
          favoriteCount: 0
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        const response: AuthResponse = {
          token: mockToken,
          user: mockUser
        };
        this.token.set(mockToken);
        this.currentUser.set(mockUser);
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));

        observer.next(response);
        observer.complete();
      }, 500);
    });
  }

  // Logout
  logout(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  // Get current token
  getToken(): string | null {
    return this.token();
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}

