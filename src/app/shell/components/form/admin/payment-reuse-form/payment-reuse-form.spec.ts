import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReuseForm } from './payment-reuse-form';

describe('PaymentReuseForm', () => {
  let component: PaymentReuseForm;
  let fixture: ComponentFixture<PaymentReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
