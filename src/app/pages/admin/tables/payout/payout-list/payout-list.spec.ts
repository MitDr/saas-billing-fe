import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutList } from './payout-list';

describe('PayoutList', () => {
  let component: PayoutList;
  let fixture: ComponentFixture<PayoutList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
