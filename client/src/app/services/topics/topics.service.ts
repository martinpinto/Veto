import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../../models/topic.model';

@Injectable()
export class TopicsService {

  constructor(private http: HttpClient) { }

  getTopics() {
    return this.http.get<Topic[]>('http://localhost:3001/api/topic');
  }
}
