import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEdit } from './plan-edit';

describe('PlanEdit', () => {
  let component: PlanEdit;
  let fixture: ComponentFixture<PlanEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
