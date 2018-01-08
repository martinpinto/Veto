import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Quote } from '../../../models/quote.model';
import { QuotesService } from '../../../services/quotes/quotes.service';

@Component({
  selector: 'quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent implements OnInit {
  quotes: Quote[];

  private voting;

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.getQuotes();
    this.voting = {};
  }
  
  getQuotes(): void {
    this.quotesService.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  upvote(id: number) {
    this.voting[id] = true;
    this.quotesService.upvote(id);

    let quote = this.quotes.find(q => { return q.id == id; });
    if (quote) {
      quote.votes = quote.votes + 1;
    }
  }

  downvote(id: number) {
    this.voting[id] = true;
    this.quotesService.downvote(id);
    
    let quote = this.quotes.find(q => { return q.id == id; });
    if (quote) {
      quote.votes = quote.votes - 1;
    }
  }

  canClick(quoteId: number) {
    return this.voting[quoteId];
  }

}
