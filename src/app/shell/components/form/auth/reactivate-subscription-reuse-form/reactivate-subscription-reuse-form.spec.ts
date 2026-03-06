import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateSubscriptionReuseForm } from './reactivate-subscription-reuse-form';

describe('ReactivateSubscriptionReuseForm', () => {
  let component: ReactivateSubscriptionReuseForm;
  let fixture: ComponentFixture<ReactivateSubscriptionReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivateSubscriptionReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivateSubscriptionReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
