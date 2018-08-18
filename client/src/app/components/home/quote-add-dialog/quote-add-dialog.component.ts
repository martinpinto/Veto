import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Topic } from '../../../models/topic.model';
import { Quote } from '../../../models/quote.model';
import { QuotesService } from '../../../services/quotes/quotes.service';
import { Party } from '../../../models/party.model';
import { Politician } from '../../../models/politician.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'quote-add-dialog',
    templateUrl: './quote-add-dialog.html',
    styleUrls: ['./quote-add-dialog.css']
  })
  export class QuoteAddDialog {
    
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;  
    fourthFormGroup: FormGroup;  
    fifthFormGroup: FormGroup;  

    constructor(
      public quotesSvc: QuotesService,
      public dialogRef: MatDialogRef<QuoteAddDialog>,
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
      this.firstFormGroup = this.formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this.formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this.formBuilder.group({
        thirdCtrl: ['', Validators.required]
      });
      this.fourthFormGroup = this.formBuilder.group({
        fourthCtrl: ['', Validators.required]
      });
      this.fifthFormGroup = this.formBuilder.group({
        fifthCtrl: ['', Validators.required]
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    addQuote(): void {
      const title = this.firstFormGroup.value.firstCtrl;
      const description = this.secondFormGroup.value.secondCtrl;
      const source = this.thirdFormGroup.value.thirdCtrl;
      const topics = this.fourthFormGroup.value.fourthCtrl;
      const politician = this.fifthFormGroup.value.fifthCtrl;
      
      let quote: Quote = {
          title: title,
          description: description,
          source: source,
          topics: topics,
          politician: politician
      };
      this.quotesSvc.addQuote(quote);
      this.dialogRef.close();      
    }

  }