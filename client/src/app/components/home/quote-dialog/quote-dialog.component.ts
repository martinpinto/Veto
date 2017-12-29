import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'quote-dialog',
    templateUrl: './quote-dialog.html',
  })
  export class QuoteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<QuoteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }