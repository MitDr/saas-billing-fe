import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookLogDetail } from './webhook-log-detail';

describe('WebhookLogDetail', () => {
  let component: WebhookLogDetail;
  let fixture: ComponentFixture<WebhookLogDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookLogDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookLogDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
