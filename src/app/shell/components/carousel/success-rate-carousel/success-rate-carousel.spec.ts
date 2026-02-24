import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRateCarousel } from './success-rate-carousel';

describe('SuccessRateCarousel', () => {
  let component: SuccessRateCarousel;
  let fixture: ComponentFixture<SuccessRateCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessRateCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessRateCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
