import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Quote } from '../../model/quote';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: Observable<Quote>;

  constructor() { }

  ngOnInit() {
  }

}
