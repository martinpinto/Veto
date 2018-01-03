import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../models/topic.model';
import { TopicsService } from '../../../services/topics/topics.service';

@Component({
  selector: 'topic-showcase',
  templateUrl: './topic-showcase.component.html',
  styleUrls: ['./topic-showcase.component.css']
})
export class TopicShowcaseComponent implements OnInit {
  topics: Topic[];

  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.getTopics();
  }

  getTopics() {
    this.topicsService.getTopics().subscribe(topics => this.topics = topics);
  }
}
