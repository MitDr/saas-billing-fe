import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointDtoCard } from './webhook-endpoint-dto-card';

describe('WebhookEndpointDtoCard', () => {
  let component: WebhookEndpointDtoCard;
  let fixture: ComponentFixture<WebhookEndpointDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
