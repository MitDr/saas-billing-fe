import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanDtoCard } from './auth-plan-dto-card';

describe('AuthPlanDtoCard', () => {
  let component: AuthPlanDtoCard;
  let fixture: ComponentFixture<AuthPlanDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
