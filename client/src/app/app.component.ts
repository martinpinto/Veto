import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(public dialog: MatDialog) {}

  createNewQuote() {
    let dialogRef = this.dialog.open(QuotesDialog, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'quote-dialog',
  templateUrl: './components/home/quote-dialog.html',
})
export class QuotesDialog {

  constructor(
    public dialogRef: MatDialogRef<QuotesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}