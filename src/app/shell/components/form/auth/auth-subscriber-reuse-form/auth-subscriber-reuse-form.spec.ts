import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriberReuseForm } from './auth-subscriber-reuse-form';

describe('AuthSubscriberReuseForm', () => {
  let component: AuthSubscriberReuseForm;
  let fixture: ComponentFixture<AuthSubscriberReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriberReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriberReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
