import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/User';

export class AppComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _jwtHelperService: JwtHelperService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this._authService.decodedToken = this._jwtHelperService.decodeToken(token);
    }
  }
}