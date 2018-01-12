import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDialog } from './components/login/login-dialog.component';
import { QuoteAddDialog } from './components/home/quote-add-dialog/quote-add-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(public dialog: MatDialog) {}

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
    });
  }
}
