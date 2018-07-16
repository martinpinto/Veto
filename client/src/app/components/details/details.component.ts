import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../../models/quote.model';
import { QuotesService } from '../../services/quotes/quotes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  quote: Quote;

  constructor(private route: ActivatedRoute, private quotesSvc: QuotesService) { }

  ngOnInit() {
    //this.route.params.subscribe((params) => this.id = params.id);
    const id = +this.route.snapshot.paramMap.get('id');
    this.getQuote(id);
  }

  getQuote(id: number) {
    this.quotesSvc.getQuote(id).subscribe(quote => this.quote = quote);
  }

}
