import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupDtoCard } from './plan-group-dto-card';

describe('PlanGroupDtoCard', () => {
  let component: PlanGroupDtoCard;
  let fixture: ComponentFixture<PlanGroupDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
