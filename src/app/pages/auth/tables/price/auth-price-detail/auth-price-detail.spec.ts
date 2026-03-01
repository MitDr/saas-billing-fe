import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceDetail } from './auth-price-detail';

describe('AuthPriceDetail', () => {
  let component: AuthPriceDetail;
  let fixture: ComponentFixture<AuthPriceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
