import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriptionCard } from './auth-subscription-card';

describe('AuthSubscriptionCard', () => {
  let component: AuthSubscriptionCard;
  let fixture: ComponentFixture<AuthSubscriptionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriptionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriptionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
