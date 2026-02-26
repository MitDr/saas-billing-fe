import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupList } from './auth-plan-group-list';

describe('AuthPlanGroupList', () => {
  let component: AuthPlanGroupList;
  let fixture: ComponentFixture<AuthPlanGroupList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
