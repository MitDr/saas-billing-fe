import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanReuseForm } from './' +
  'plan-reuse-form';

describe('PlanReuseForm', () => {
  let component: PlanReuseForm;
  let fixture: ComponentFixture<PlanReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
