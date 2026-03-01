import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntitlementDtoCard } from './auth-entitlement-dto-card';

describe('AuthEntitlementDtoCard', () => {
  let component: AuthEntitlementDtoCard;
  let fixture: ComponentFixture<AuthEntitlementDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEntitlementDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthEntitlementDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
