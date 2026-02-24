import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRateCard } from './success-rate-card';

describe('SuccessRateCard', () => {
  let component: SuccessRateCard;
  let fixture: ComponentFixture<SuccessRateCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessRateCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessRateCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
