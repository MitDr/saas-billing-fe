import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPlanDtoCard } from './portal-plan-dto-card';

describe('PortalPlanDtoCard', () => {
  let component: PortalPlanDtoCard;
  let fixture: ComponentFixture<PortalPlanDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalPlanDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalPlanDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
