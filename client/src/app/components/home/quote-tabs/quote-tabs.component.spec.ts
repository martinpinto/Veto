import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteTabsComponent } from './quote-tabs.component';

describe('QuoteTabsComponent', () => {
  let component: QuoteTabsComponent;
  let fixture: ComponentFixture<QuoteTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
