import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCard } from './price-card';

describe('PriceCard', () => {
  let component: PriceCard;
  let fixture: ComponentFixture<PriceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
