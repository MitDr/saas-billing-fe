import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPayoutReuseForm } from './auth-payout-reuse-form';

describe('AuthPayoutReuseForm', () => {
  let component: AuthPayoutReuseForm;
  let fixture: ComponentFixture<AuthPayoutReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPayoutReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPayoutReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
