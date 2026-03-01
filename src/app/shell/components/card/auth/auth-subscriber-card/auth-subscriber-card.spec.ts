import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriberCard } from './auth-subscriber-card';

describe('AuthSubscriberCard', () => {
  let component: AuthSubscriberCard;
  let fixture: ComponentFixture<AuthSubscriberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriberCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriberCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
