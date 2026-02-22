import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDtoCard } from './user-dto-card';

describe('UserDtoCard', () => {
  let component: UserDtoCard;
  let fixture: ComponentFixture<UserDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
