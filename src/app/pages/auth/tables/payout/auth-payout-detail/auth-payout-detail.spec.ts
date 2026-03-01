import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPayoutDetail } from './auth-payout-detail';

describe('AuthPayoutDetail', () => {
  let component: AuthPayoutDetail;
  let fixture: ComponentFixture<AuthPayoutDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPayoutDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPayoutDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
