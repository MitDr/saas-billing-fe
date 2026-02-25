import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurnRateChart } from './churn-rate-chart';

describe('ChurnRateChart', () => {
  let component: ChurnRateChart;
  let fixture: ComponentFixture<ChurnRateChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurnRateChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurnRateChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
