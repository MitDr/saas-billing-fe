import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookLogList } from './auth-webhook-log-list';

describe('AuthWebhookLogList', () => {
  let component: AuthWebhookLogList;
  let fixture: ComponentFixture<AuthWebhookLogList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookLogList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookLogList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
