import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPaymentCard } from './auth-payment-card';

describe('AuthPaymentCard', () => {
  let component: AuthPaymentCard;
  let fixture: ComponentFixture<AuthPaymentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPaymentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPaymentCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
