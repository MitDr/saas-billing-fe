import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutCreate } from './payout-create';

describe('PayoutCreate', () => {
  let component: PayoutCreate;
  let fixture: ComponentFixture<PayoutCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
