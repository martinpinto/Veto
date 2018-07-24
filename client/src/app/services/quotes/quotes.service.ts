import { Injectable } from '@angular/core';
import { Quote } from '../../models/quote.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class QuotesService {

  constructor(
    private http: HttpClient
  ) { }
  
  getQuote(id: number) {
    return this.http.get<Quote>(`http://localhost:3001/api/quote/${id}`);
  }

  getQuotes() {
    return this.http.get<Quote[]>('http://localhost:3001/api/quote');
  }

  getWeeklyQuotes() {
    return this.http.get<Quote[]>('http://localhost:3001/api/quote/weekly');
  }

  addQuote(quote: Quote): void {
    this.http.post<Quote>(`http://localhost:3001/api/quote`, quote).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
    );
  }

  vote(id: number, voteType: string) {
    return this.http.put<Quote>(`http://localhost:3001/api/quote/${id}/vote`, {
      "vote": voteType
    });
  }

  addFavorite(id: any): any {
    return this.http.post(`http://localhost:3001/api/quote/${id}/favorite`, {});
  }

}
