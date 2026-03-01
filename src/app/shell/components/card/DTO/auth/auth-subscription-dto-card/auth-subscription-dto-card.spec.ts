import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriptionDtoCard } from './auth-subscription-dto-card';

describe('AuthSubscriptionDtoCard', () => {
  let component: AuthSubscriptionDtoCard;
  let fixture: ComponentFixture<AuthSubscriptionDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriptionDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriptionDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
