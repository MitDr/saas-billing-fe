import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookEndpointDtoCard } from './auth-webhook-endpoint-dto-card';

describe('AuthWebhookEndpointDtoCard', () => {
  let component: AuthWebhookEndpointDtoCard;
  let fixture: ComponentFixture<AuthWebhookEndpointDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookEndpointDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookEndpointDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
