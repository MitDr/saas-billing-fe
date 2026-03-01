import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanEdit } from './auth-plan-edit';

describe('AuthPlanEdit', () => {
  let component: AuthPlanEdit;
  let fixture: ComponentFixture<AuthPlanEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
