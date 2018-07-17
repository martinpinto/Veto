import { Injectable, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { AlertService } from '../alert/alert.service';

export interface AuthResponse {
    user: User,
    token: string
}

@Injectable()
export class AuthService {

  users: User[];

  constructor(
      public http: HttpClient,
      public alertSvc: AlertService
    ) {}

  isLoggedIn(): boolean {
    // return tokenNotExpired('id_token', localStorage.getItem('id_token'));
    let token = localStorage.getItem('id_token');
    return !!token;
  }

  async login(username: string, password: string) {
    this.http.post("http://localhost:3001/auth", {
        username: username,
        password: password
    }).subscribe((res: AuthResponse) => {
      // We get the user's JWT
      localStorage.setItem('id_token', res.token);
      localStorage.setItem('loggedin_user', JSON.stringify(res.user));
    });
  }

  logout() {
    // To log out, we just need to remove
    // the user's token
    localStorage.removeItem('id_token');
    localStorage.removeItem('loggedin_user');
  }

  getUsers() {
    this.http.get('http://localhost:3001/api/users')
      // .map(res => res.json())
      // .subscribe(
      //   users => this.users = users,
      //   error => console.log(error)
      // );
  }
}
