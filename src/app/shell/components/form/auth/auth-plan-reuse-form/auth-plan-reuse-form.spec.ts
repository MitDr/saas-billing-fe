import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanReuseForm } from './auth-plan-reuse-form';

describe('AuthPlanReuseForm', () => {
  let component: AuthPlanReuseForm;
  let fixture: ComponentFixture<AuthPlanReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
