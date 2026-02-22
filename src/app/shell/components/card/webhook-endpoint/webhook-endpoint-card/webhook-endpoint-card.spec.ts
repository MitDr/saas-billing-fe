import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointCard } from './webhook-endpoint-card';

describe('WebhookEndpointCard', () => {
  let component: WebhookEndpointCard;
  let fixture: ComponentFixture<WebhookEndpointCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
