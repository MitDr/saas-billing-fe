import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupDetail } from './auth-plan-group-detail';

describe('AuthPlanGroupDetail', () => {
  let component: AuthPlanGroupDetail;
  let fixture: ComponentFixture<AuthPlanGroupDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
