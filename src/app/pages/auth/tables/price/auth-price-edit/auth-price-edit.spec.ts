import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceEdit } from './auth-price-edit';

describe('AuthPriceEdit', () => {
  let component: AuthPriceEdit;
  let fixture: ComponentFixture<AuthPriceEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
