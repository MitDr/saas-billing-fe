import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriptionList } from './auth-subscription-list';

describe('AuthSubscriptionList', () => {
  let component: AuthSubscriptionList;
  let fixture: ComponentFixture<AuthSubscriptionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriptionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriptionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
