import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOvervieCarousel } from './subscription-overvie-carousel';

describe('SubscriptionOvervieCarousel', () => {
  let component: SubscriptionOvervieCarousel;
  let fixture: ComponentFixture<SubscriptionOvervieCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionOvervieCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionOvervieCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
