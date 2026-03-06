import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewSubscriptionReuseForm } from './renew-subscription-reuse-form';

describe('RenewSubscriptionReuseForm', () => {
  let component: RenewSubscriptionReuseForm;
  let fixture: ComponentFixture<RenewSubscriptionReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewSubscriptionReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewSubscriptionReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
