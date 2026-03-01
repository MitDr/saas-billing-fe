import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookLogCard } from './auth-webhook-log-card';

describe('AuthWebhookLogCard', () => {
  let component: AuthWebhookLogCard;
  let fixture: ComponentFixture<AuthWebhookLogCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookLogCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookLogCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
