import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../services/authentication/auth.service';

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.html',
    providers: [AuthService]
  })
  export class LoginDialog {
  
    constructor(
      public dialogRef: MatDialogRef<LoginDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private auth: AuthService
    ) {}
  
    login() {
      this.auth.login();
    }
    logout() {
      this.auth.logout();
    }
  }