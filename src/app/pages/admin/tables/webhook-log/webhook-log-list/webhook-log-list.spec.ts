import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookLogList } from './webhook-log-list';

describe('WebhookLogList', () => {
  let component: WebhookLogList;
  let fixture: ComponentFixture<WebhookLogList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookLogList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookLogList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
