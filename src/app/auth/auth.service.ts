import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticated = true;
  private userId = 'usr1';

  constructor() { }

  getUserIsAuthenticated(){
    return this.userIsAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  login(){
    this.userIsAuthenticated = true;
  }

  logout(){
    this.userIsAuthenticated = false;
  }
}
