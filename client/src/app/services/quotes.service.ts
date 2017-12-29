import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuotesService {

  constructor(private http: HttpClient) { }
  
  getQuote(id: number): Observable<Quote> {
    return this.http.get(`http://localhost:3001/api/quotes/${id}`).map((res: Response) => res.json() as Quote);
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>('http://localhost:3001/api/quotes');
  }

}
