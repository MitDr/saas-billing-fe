import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceCreate } from './auth-price-create';

describe('AuthPriceCreate', () => {
  let component: AuthPriceCreate;
  let fixture: ComponentFixture<AuthPriceCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
