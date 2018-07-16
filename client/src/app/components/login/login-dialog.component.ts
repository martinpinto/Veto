import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../services/authentication/auth.service';

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.html',
    providers: [AuthService]
  })
  export class LoginDialog {
  
    username: string;
    password: string;

    constructor(
      public dialogRef: MatDialogRef<LoginDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private auth: AuthService
    ) {}
  
    login() {
      this.auth.login(this.username, this.password);
      this.dialogRef.close();
    }
    
    logout() {
      this.auth.logout();
    }
  }