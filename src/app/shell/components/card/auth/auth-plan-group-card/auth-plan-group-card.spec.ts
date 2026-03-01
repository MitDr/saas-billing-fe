import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupCard } from './auth-plan-group-card';

describe('AuthPlanGroupCard', () => {
  let component: AuthPlanGroupCard;
  let fixture: ComponentFixture<AuthPlanGroupCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
