import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInvoiceDetail } from './auth-invoice-detail';

describe('AuthInvoiceDetail', () => {
  let component: AuthInvoiceDetail;
  let fixture: ComponentFixture<AuthInvoiceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInvoiceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInvoiceDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
