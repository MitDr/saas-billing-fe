import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanCreate } from './auth-plan-create';

describe('AuthPlanCreate', () => {
  let component: AuthPlanCreate;
  let fixture: ComponentFixture<AuthPlanCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
