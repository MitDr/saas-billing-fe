import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionReuseForm } from './subscription-reuse-form';

describe('SubscriptionReuseForm', () => {
  let component: SubscriptionReuseForm;
  let fixture: ComponentFixture<SubscriptionReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
