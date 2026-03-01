import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookEndpointDetail } from './auth-webhook-endpoint-detail';

describe('AuthWebhookEndpointDetail', () => {
  let component: AuthWebhookEndpointDetail;
  let fixture: ComponentFixture<AuthWebhookEndpointDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookEndpointDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookEndpointDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
