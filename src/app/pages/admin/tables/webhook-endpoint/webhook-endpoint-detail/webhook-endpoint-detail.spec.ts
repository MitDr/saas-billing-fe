import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointDetail } from './webhook-endpoint-detail';

describe('WebhookEndpointDetail', () => {
  let component: WebhookEndpointDetail;
  let fixture: ComponentFixture<WebhookEndpointDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
