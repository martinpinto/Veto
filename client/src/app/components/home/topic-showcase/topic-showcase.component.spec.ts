import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicShowcaseComponent } from './topic-showcase.component';

describe('TopicShowcaseComponent', () => {
  let component: TopicShowcaseComponent;
  let fixture: ComponentFixture<TopicShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
