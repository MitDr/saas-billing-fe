import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntitlementList } from './auth-entitlement-list';

describe('AuthEntitlementList', () => {
  let component: AuthEntitlementList;
  let fixture: ComponentFixture<AuthEntitlementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEntitlementList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEntitlementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
