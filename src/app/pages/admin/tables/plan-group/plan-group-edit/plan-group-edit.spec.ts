import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupEdit } from './plan-group-edit';

describe('PlanGroupEdit', () => {
  let component: PlanGroupEdit;
  let fixture: ComponentFixture<PlanGroupEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
