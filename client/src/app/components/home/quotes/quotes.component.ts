import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Quote } from '../../../models/quote.model';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.getQuotes();
  }
  
  getQuotes(): void {
    this.quotesService.getQuotes().subscribe(quotes => this.quotes = quotes);
  }
}
