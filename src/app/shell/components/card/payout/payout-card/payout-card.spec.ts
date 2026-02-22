import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutCard } from './payout-card';

describe('PayoutCard', () => {
  let component: PayoutCard;
  let fixture: ComponentFixture<PayoutCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
