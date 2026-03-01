import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureCard } from './auth-feature-card';

describe('AuthFeatureCard', () => {
  let component: AuthFeatureCard;
  let fixture: ComponentFixture<AuthFeatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFeatureCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
