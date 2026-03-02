import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupReuseForm } from './auth-plan-group-reuse-form';

describe('AuthPlanGroupReuseForm', () => {
  let component: AuthPlanGroupReuseForm;
  let fixture: ComponentFixture<AuthPlanGroupReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
