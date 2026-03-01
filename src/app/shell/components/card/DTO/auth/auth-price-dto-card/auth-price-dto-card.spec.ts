import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceDtoCard } from './auth-price-dto-card';

describe('AuthPriceDtoCard', () => {
  let component: AuthPriceDtoCard;
  let fixture: ComponentFixture<AuthPriceDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
