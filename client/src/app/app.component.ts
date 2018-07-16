import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDialog } from './components/login/login-dialog.component';
import { QuoteAddDialog } from './components/home/quote-add-dialog/quote-add-dialog.component';
import { AuthService } from './services/authentication/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @Input() loggedInUser: User;

  constructor(public dialog: MatDialog, public authSvc: AuthService) {
  }

  createNewQuote() {
    let dialogRef = this.dialog.open(QuoteAddDialog, {
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  login(): void {
    let dialogRef = this.dialog.open(LoginDialog, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedin_user'));
    });
  }

  logout(): void {
    this.authSvc.logout();
  }

  isLoggedIn(): boolean {
    return this.authSvc.isLoggedIn();
  }
}
