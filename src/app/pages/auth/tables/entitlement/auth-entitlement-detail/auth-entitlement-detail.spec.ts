import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntitlementDetail } from './auth-entitlement-detail';

describe('AuthEntitlementDetail', () => {
  let component: AuthEntitlementDetail;
  let fixture: ComponentFixture<AuthEntitlementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEntitlementDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEntitlementDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
