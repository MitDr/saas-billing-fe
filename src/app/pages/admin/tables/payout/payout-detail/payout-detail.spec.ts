import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutDetail } from './payout-detail';

describe('PayoutDetail', () => {
  let component: PayoutDetail;
  let fixture: ComponentFixture<PayoutDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
