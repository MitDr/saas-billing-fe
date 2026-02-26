import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanList } from './auth-plan-list';

describe('AuthPlanList', () => {
  let component: AuthPlanList;
  let fixture: ComponentFixture<AuthPlanList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
