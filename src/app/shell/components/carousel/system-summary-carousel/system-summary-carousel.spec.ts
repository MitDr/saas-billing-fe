import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSummaryCarousel } from './system-summary-carousel';

describe('SystemSummaryCarousel', () => {
  let component: SystemSummaryCarousel;
  let fixture: ComponentFixture<SystemSummaryCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemSummaryCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemSummaryCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
