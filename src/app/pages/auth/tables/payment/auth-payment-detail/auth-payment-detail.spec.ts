import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPaymentDetail } from './auth-payment-detail';

describe('AuthPaymentDetail', () => {
  let component: AuthPaymentDetail;
  let fixture: ComponentFixture<AuthPaymentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPaymentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPaymentDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
