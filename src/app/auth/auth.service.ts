import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface AuthResponseData {
  // kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIsAuthenticated = false;
  private userId = null;

  constructor(private http: HttpClient) {}

  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  login() {
    this.userIsAuthenticated = true;
  }

  logout() {
    this.userIsAuthenticated = false;
  }
}
