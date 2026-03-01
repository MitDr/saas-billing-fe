import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriberDetail } from './auth-subscriber-detail';

describe('AuthSubscriberDetail', () => {
  let component: AuthSubscriberDetail;
  let fixture: ComponentFixture<AuthSubscriberDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriberDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriberDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
