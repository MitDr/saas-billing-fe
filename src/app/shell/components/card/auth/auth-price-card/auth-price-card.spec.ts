import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceCard } from './auth-price-card';

describe('AuthPriceCard', () => {
  let component: AuthPriceCard;
  let fixture: ComponentFixture<AuthPriceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
