import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInvoiceCard } from './auth-invoice-card';

describe('AuthInvoiceCard', () => {
  let component: AuthInvoiceCard;
  let fixture: ComponentFixture<AuthInvoiceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInvoiceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInvoiceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
