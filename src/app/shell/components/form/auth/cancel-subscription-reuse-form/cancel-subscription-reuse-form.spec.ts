import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubscriptionReuseForm } from './cancel-subscription-reuse-form';

describe('CancelSubscriptionReuseForm', () => {
  let component: CancelSubscriptionReuseForm;
  let fixture: ComponentFixture<CancelSubscriptionReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelSubscriptionReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelSubscriptionReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
