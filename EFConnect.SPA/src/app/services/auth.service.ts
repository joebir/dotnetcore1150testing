import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../models/AuthUser';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;

  constructor(private _http: HttpClient,
    private _jwtHelperService: JwtHelperService) { }

  login(model: any) {
    return this._http.post<AuthUser>(this.baseUrl + 'login', model, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
      .map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.decodedToken = this._jwtHelperService.decodeToken(user.tokenString);   // <--- Added
          this.userToken = user.tokenString;
        }
      });
  }


  loggedIn() {
    const token = this._jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this._jwtHelperService.isTokenExpired(token);
  }
}
