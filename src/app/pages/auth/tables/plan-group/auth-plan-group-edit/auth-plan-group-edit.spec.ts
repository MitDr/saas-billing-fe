import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupEdit } from './auth-plan-group-edit';

describe('AuthPlanGroupEdit', () => {
  let component: AuthPlanGroupEdit;
  let fixture: ComponentFixture<AuthPlanGroupEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
