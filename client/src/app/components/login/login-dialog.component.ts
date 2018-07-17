import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService, AuthResponse } from '../../services/authentication/auth.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';

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
      private authSvc: AuthService,
      private alertSvc: AlertService
    ) {}
  
    login() {
      this.authSvc.login(this.username, this.password);
      this.dialogRef.close();
    }

    logout() {
      this.authSvc.logout();
    }
  }