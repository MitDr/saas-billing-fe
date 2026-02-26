import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPayoutList } from './auth-payout-list';

describe('AuthPayoutList', () => {
  let component: AuthPayoutList;
  let fixture: ComponentFixture<AuthPayoutList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPayoutList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPayoutList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
