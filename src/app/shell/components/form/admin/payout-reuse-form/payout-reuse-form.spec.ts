import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutReuseForm } from './payout-reuse-form';

describe('PayoutReuseForm', () => {
  let component: PayoutReuseForm;
  let fixture: ComponentFixture<PayoutReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
