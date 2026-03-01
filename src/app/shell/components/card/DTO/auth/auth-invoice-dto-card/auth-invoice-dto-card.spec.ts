import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInvoiceDtoCard } from './auth-invoice-dto-card';

describe('AuthInvoiceDtoCard', () => {
  let component: AuthInvoiceDtoCard;
  let fixture: ComponentFixture<AuthInvoiceDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInvoiceDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInvoiceDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
