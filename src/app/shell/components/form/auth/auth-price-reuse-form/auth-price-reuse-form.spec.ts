import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceReuseForm } from './auth-price-reuse-form';

describe('AuthPriceReuseForm', () => {
  let component: AuthPriceReuseForm;
  let fixture: ComponentFixture<AuthPriceReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
