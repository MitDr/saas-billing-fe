import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanDetail } from './auth-plan-detail';

describe('AuthPlanDetail', () => {
  let component: AuthPlanDetail;
  let fixture: ComponentFixture<AuthPlanDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
