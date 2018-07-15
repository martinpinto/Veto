import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface AuthResponse {
    user: User,
    token: string
}

@Injectable()
export class AuthService {

  users: User[];

  constructor(
      public authHttp: AuthHttp,
      public http: HttpClient
    ) {}

  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  async login(username: string, password: string) {
    let response: any = this.http.post("http://localhost:3001/auth", {
        username: username,
        password: password
    });

    // We also get the user's JWT
    localStorage.setItem('id_token', response.token);
  }

  logout() {
    // To log out, we just need to remove
    // the user's token
    localStorage.removeItem('id_token');
  }

  getUsers() {
    this.authHttp.get('http://localhost:3001/api/users')
      .map(res => res.json())
      .subscribe(
        users => this.users = users,
        error => console.log(error)
      );
  }
}
