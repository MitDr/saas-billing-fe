import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookEndpointCard } from './auth-webhook-endpoint-card';

describe('AuthWebhookEndpointCard', () => {
  let component: AuthWebhookEndpointCard;
  let fixture: ComponentFixture<AuthWebhookEndpointCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookEndpointCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookEndpointCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
