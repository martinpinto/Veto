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
    loginForm: FormGroup;
    registerForm: FormGroup;
    private formSubmitAttempt: boolean;

    username: string;
    password: string;
    /* register */
    firstname: string;
    lastname: string;

    constructor(
      public dialogRef: MatDialogRef<LoginDialog>,
      private authSvc: AuthService,
      private alertSvc: AlertService,
      private formBuilder: FormBuilder,
      public snackBar: MatSnackBar
    ) {}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]
      });
    }
  
    isLoginFieldInvalid(field: string) {
      return (
        (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
        (this.loginForm.get(field).untouched && this.formSubmitAttempt)
      );
    }

    isRegisterFieldInvalid(field: string) {
      return (
        (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
        (this.registerForm.get(field).untouched && this.formSubmitAttempt)
      );
    }

    onSubmit(loginType: string) {
      if (loginType === 'login') {
        if (this.loginForm.valid && this.loginForm.value) {
          this.authSvc.login(this.loginForm.value.username, this.loginForm.value.password, (status) => {
            if (!status.error) {
              this.dialogRef.close();
            } else {
              // alert
              if (status === 401) {
                this.snackBar.open('Login failed!', 'Please check your credentials!', {
                  duration: 2000,
                });          
              } else {
                this.snackBar.open('Login failed!', status.statusText, {
                  duration: 2000,
                }); 
              }
            }
          });
        }
      } else if (loginType === 'register') {
        if (this.registerForm.valid && this.registerForm.value) {
          this.authSvc.register(
            this.registerForm.value.username, 
            this.registerForm.value.password,
            this.registerForm.value.firstname, 
            this.registerForm.value.lastname, (status) => {
            if (!status.error) {
              this.dialogRef.close();
            } else {
              // alert
              if (status === 401) {
                this.snackBar.open('Login failed!', 'Please check your credentials!', {
                  duration: 2000,
                });          
              } else {
                this.snackBar.open('Login failed!', status.statusText, {
                  duration: 2000,
                });  
              }        
            }
          });        
        }
        this.formSubmitAttempt = true;
      }
    }

    logout() {
      this.authSvc.logout();
    }
  }