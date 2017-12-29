import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Quote } from '../../../models/quote.model';

@Component({
    selector: 'quote-dialog',
    templateUrl: './quote-dialog.html',
    styleUrls: ['./quote-dialog.css']
  })
  export class QuoteDialog {
    quote: Quote = {
      _id: 1,
      title: "Test",
      author: "",
      description: "",
      type: "",
      status: "",
      topic: "",
      hashtags: [],
      votes: 0,
      dateCreated: new Date(),
      dateQuote: null,
      source: "",
      party: ""
    };
    
    constructor(
      public dialogRef: MatDialogRef<QuoteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }