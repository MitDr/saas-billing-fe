import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookEndpointReuseForm } from './auth-webhook-endpoint-reuse-form';

describe('AuthWebhookEndpointReuseForm', () => {
  let component: AuthWebhookEndpointReuseForm;
  let fixture: ComponentFixture<AuthWebhookEndpointReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookEndpointReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookEndpointReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
