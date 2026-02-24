import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrrChart } from './mrr-chart';

describe('MrrChart', () => {
  let component: MrrChart;
  let fixture: ComponentFixture<MrrChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrrChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrrChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
