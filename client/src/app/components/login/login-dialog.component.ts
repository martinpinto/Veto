import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService, AuthResponse } from '../../services/authentication/auth.service';
import { Observable, from } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';

@Component({
    selector: 'login-dialog',
    templateUrl: './login-dialog.html',
    providers: [AuthService]
  })
  export class LoginDialog {
    form: FormGroup;
    private formSubmitAttempt: boolean;

    username: string;
    password: string;

    constructor(
      public dialogRef: MatDialogRef<LoginDialog>,
      private authSvc: AuthService,
      private alertSvc: AlertService,
      private formBuilder: FormBuilder,
      public snackBar: MatSnackBar
    ) {}

    ngOnInit() {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  
    isFieldInvalid(field: string) {
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formSubmitAttempt)
      );
    }

    onSubmit() {
      if (this.form.valid && this.form.value) {
        this.authSvc.login(this.form.value.username, this.form.value.password, (status) => {
          if (!status.error) {
            this.dialogRef.close();
          } else {
            // alert
            this.snackBar.open('Login failed!', 'Please check your credentials!', {
              duration: 2000,
            });          
          }
        })
      }
      this.formSubmitAttempt = true;
    }

    logout() {
      this.authSvc.logout();
    }
  }