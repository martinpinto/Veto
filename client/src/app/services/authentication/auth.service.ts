import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { User } from '../../models/user.model';

// We want to avoid any 'name not found'
// warnings from TypeScript
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
  
  users: User[];

  constructor(public authHttp: AuthHttp) {}
  
  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  login() {
    this.lock.show((error: string, profile: Object, id_token: string) => {
      if (error) {
        console.log(error);
      }
      // We get a profile object for the user from Auth0
      localStorage.setItem('profile', JSON.stringify(profile));
      // We also get the user's JWT
      localStorage.setItem('id_token', id_token);
    });
  }

  logout() {
    // To log out, we just need to remove
    // the user's profile and token
    localStorage.removeItem('profile');
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
