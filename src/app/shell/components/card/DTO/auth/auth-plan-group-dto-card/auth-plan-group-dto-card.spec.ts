import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupDtoCard } from './auth-plan-group-dto-card';

describe('AuthPlanGroupDtoCard', () => {
  let component: AuthPlanGroupDtoCard;
  let fixture: ComponentFixture<AuthPlanGroupDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
