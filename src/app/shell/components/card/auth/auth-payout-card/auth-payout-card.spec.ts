import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPayoutCard } from './auth-payout-card';

describe('AuthPayoutCard', () => {
  let component: AuthPayoutCard;
  let fixture: ComponentFixture<AuthPayoutCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPayoutCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPayoutCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
