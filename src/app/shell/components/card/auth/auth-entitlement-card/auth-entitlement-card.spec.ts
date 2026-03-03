import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntitlementCard } from './auth-entitlement-card';

describe('AuthEntitlementCard', () => {
  let component: AuthEntitlementCard;
  let fixture: ComponentFixture<AuthEntitlementCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEntitlementCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEntitlementCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
