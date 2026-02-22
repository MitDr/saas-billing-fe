import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupCreate } from './plan-group-create';

describe('PlanGroupCreate', () => {
  let component: PlanGroupCreate;
  let fixture: ComponentFixture<PlanGroupCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
