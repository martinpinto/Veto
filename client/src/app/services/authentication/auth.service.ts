import { Injectable, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { AlertService } from '../alert/alert.service';
import { map } from "rxjs/operators";

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
    let token = localStorage.getItem('access_token');
    return !!token;
  }

  login(username: string, password: string, callback){
    return this.http.post<AuthResponse>("http://localhost:3001/auth", {
        username: username,
        password: password
    })
    // .pipe(
    //   map((result: AuthResponse) => {
    //     localStorage.setItem('access_token', result.token);
    //     localStorage.setItem('loggedin_user', JSON.stringify(result.user));        
    //     return result.user;
    //   })
    // )
    .subscribe(
      (res: any) => {
        // We get the user's JWT
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('loggedin_user', JSON.stringify(res.user));
        callback(true)
      },
      error => {
        console.log(error);
        callback(error);
      }
    );
  }

  logout() {
    // To log out, we just need to remove
    // the user's token
    localStorage.removeItem('access_token');
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
