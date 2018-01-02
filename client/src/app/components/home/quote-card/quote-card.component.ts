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

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.getQuotes();
  }
  
  getQuotes(): void {
    this.quotesService.getQuotes().subscribe(quotes => this.quotes = quotes);
  }
}
