import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserCard } from './auth-user-card';

describe('AuthUserCard', () => {
  let component: AuthUserCard;
  let fixture: ComponentFixture<AuthUserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUserCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
