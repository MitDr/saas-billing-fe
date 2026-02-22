import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupDetail } from './plan-group-detail';

describe('PlanGroupDetail', () => {
  let component: PlanGroupDetail;
  let fixture: ComponentFixture<PlanGroupDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
