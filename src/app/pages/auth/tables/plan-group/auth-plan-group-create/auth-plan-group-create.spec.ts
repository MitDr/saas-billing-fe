import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPlanGroupCreate } from './auth-plan-group-create';

describe('AuthPlanGroupCreate', () => {
  let component: AuthPlanGroupCreate;
  let fixture: ComponentFixture<AuthPlanGroupCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPlanGroupCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPlanGroupCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
