import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanCard } from './auth-plan-card';

describe('AuthPlanCard', () => {
  let component: AuthPlanCard;
  let fixture: ComponentFixture<AuthPlanCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
