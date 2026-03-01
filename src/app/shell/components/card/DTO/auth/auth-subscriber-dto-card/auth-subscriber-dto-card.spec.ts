import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriberDtoCard } from './auth-subscriber-dto-card';

describe('AuthSubscriberDtoCard', () => {
  let component: AuthSubscriberDtoCard;
  let fixture: ComponentFixture<AuthSubscriberDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriberDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriberDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
