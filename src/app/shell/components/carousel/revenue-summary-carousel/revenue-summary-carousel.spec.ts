import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSummaryCarousel } from './revenue-summary-carousel';

describe('RevenueSummaryCarousel', () => {
  let component: RevenueSummaryCarousel;
  let fixture: ComponentFixture<RevenueSummaryCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueSummaryCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueSummaryCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
