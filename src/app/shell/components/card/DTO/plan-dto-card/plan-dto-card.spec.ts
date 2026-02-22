import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDtoCard } from './plan-dto-card';

describe('PlanDtoCard', () => {
  let component: PlanDtoCard;
  let fixture: ComponentFixture<PlanDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
