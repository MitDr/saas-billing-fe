import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGroupCard } from './plan-group-card';

describe('PlanGroupCard', () => {
  let component: PlanGroupCard;
  let fixture: ComponentFixture<PlanGroupCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGroupCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanGroupCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
