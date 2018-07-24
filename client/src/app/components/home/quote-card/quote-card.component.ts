import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Quote } from '../../../models/quote.model';
import { QuotesService } from '../../../services/quotes/quotes.service';

@Component({
  selector: 'quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent implements OnInit {
  quotes: Quote[];

  @Input()
  quoteType: string;

  private voting;

  constructor(private quotesSvc: QuotesService, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.quoteType) {
      switch (this.quoteType) {
        case "week":
          this.getWeeklyQuotes();
          break;
      }
    } else {
      this.getQuotes();
    }
    this.voting = {};
  }
  
  getQuotes(): void {
    this.quotesSvc.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  getWeeklyQuotes() {
    this.quotesSvc.getWeeklyQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  vote(id: number, voteType: string) {
    this.voting[id] = true;
    this.quotesSvc.vote(id, voteType).subscribe(
      result => {
        let quote = this.quotes.find(q => { return q.id == id; });
        if (quote) {
          if (voteType === 'Up') {
            quote.votes = quote.votes + 1;
          } else if (voteType === 'Down') {
            quote.votes = quote.votes - 1;
          }
        }
      }
    );
  }

  canClick(quoteId: number) {
    return this.voting[quoteId];
  }

  openShareDialog(id: number, title: string): void {
    let dialogRef = this.dialog.open(QuoteCardDialog, {
      width: '250px',
      data: { quoteId: id, quoteTitle: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'quote-card-dialog',
  template: `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <h2>Share to social media</h2>
  <div id="share">
    <!-- facebook -->
    <a class="facebook" href="https://www.facebook.com/share.php?u=http://localhost:4200/quote/{{data.quoteId}}&title={{data.quoteTitle}}" target="blank"><i class="fa fa-facebook"></i></a>
  
    <!-- twitter -->
    <a class="twitter" href="https://twitter.com/intent/tweet?status={{data.quoteTitle}}+http://localhost:4200/quote/{{data.quoteId}}" target="blank"><i class="fa fa-twitter"></i></a>
  
    <!-- google plus -->
    <a class="googleplus" href="https://plus.google.com/share?url=http://localhost:4200}/quote/{{data.quoteId}}" target="blank"><i class="fa fa-google-plus"></i></a>
  
    <!-- linkedin -->
    <a class="linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=http://localhost:4200/quote/{{data.quoteId}}&title={{data.quoteTitle}}&source={{source}}" target="blank"><i class="fa fa-linkedin"></i></a>
    
    <!-- pinterest -->
    <a class="pinterest" href="https://pinterest.com/pin/create/bookmarklet/?media={{media}}&url=http://localhost:4200/quote/{{data.quoteId}}&is_video=false&description={{data.quoteTitle}}" target="blank"><i class="fa fa-pinterest-p"></i></a>
    
  </div>`,
  styleUrls: ['./quote-card-dialog.css']
})
export class QuoteCardDialog {

  constructor(
    public dialogRef: MatDialogRef<QuoteCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}