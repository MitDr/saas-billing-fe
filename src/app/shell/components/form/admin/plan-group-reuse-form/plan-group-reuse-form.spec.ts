import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupReuseForm } from './plan-group-reuse-form';

describe('PlanGroupReuseForm', () => {
  let component: PlanGroupReuseForm;
  let fixture: ComponentFixture<PlanGroupReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
