import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserDtoCard } from './auth-user-dto-card';

describe('AuthUserDtoCard', () => {
  let component: AuthUserDtoCard;
  let fixture: ComponentFixture<AuthUserDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUserDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
