import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookLogDetail } from './auth-webhook-log-detail';

describe('AuthWebhookLogDetail', () => {
  let component: AuthWebhookLogDetail;
  let fixture: ComponentFixture<AuthWebhookLogDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookLogDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookLogDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
