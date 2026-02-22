import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberReuseForm } from './subscriber-reuse-form';

describe('SubscriberReuseForm', () => {
  let component: SubscriberReuseForm;
  let fixture: ComponentFixture<SubscriberReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
