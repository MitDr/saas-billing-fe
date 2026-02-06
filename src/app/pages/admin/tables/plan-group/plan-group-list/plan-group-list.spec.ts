import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupList } from './plan-group-list';

describe('PlanGroupList', () => {
  let component: PlanGroupList;
  let fixture: ComponentFixture<PlanGroupList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
