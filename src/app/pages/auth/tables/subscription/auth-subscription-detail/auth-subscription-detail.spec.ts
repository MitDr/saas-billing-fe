import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriptionDetail } from './auth-subscription-detail';

describe('AuthSubscriptionDetail', () => {
  let component: AuthSubscriptionDetail;
  let fixture: ComponentFixture<AuthSubscriptionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriptionDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriptionDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
