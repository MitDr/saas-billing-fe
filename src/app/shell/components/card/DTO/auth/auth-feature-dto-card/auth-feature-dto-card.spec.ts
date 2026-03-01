import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureDtoCard } from './auth-feature-dto-card';

describe('AuthFeatureDtoCard', () => {
  let component: AuthFeatureDtoCard;
  let fixture: ComponentFixture<AuthFeatureDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFeatureDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
