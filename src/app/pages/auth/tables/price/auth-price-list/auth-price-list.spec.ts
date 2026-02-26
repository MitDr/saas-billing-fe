import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPriceList } from './auth-price-list';

describe('AuthPriceList', () => {
  let component: AuthPriceList;
  let fixture: ComponentFixture<AuthPriceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPriceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPriceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
