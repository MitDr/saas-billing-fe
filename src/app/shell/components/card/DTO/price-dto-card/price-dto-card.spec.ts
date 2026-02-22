import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDtoCard } from './price-dto-card';

describe('PriceDtoCard', () => {
  let component: PriceDtoCard;
  let fixture: ComponentFixture<PriceDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
