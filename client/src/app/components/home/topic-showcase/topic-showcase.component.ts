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

  constructor(private topicsSvc: TopicsService) { }

  ngOnInit() {
    this.getTopics();
  }

  getTopics() {
    this.topicsSvc.getTopics().subscribe(topics => this.topics = topics);
  }
}
