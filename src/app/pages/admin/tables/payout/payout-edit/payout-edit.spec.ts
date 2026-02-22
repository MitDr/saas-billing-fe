import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutEdit } from './payout-edit';

describe('PayoutEdit', () => {
  let component: PayoutEdit;
  let fixture: ComponentFixture<PayoutEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
