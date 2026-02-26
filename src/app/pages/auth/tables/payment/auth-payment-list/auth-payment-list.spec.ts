import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPaymentList } from './auth-payment-list';

describe('AuthPaymentList', () => {
  let component: AuthPaymentList;
  let fixture: ComponentFixture<AuthPaymentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPaymentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPaymentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
