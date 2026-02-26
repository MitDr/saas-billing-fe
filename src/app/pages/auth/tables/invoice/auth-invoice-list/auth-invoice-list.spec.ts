import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInvoiceList } from './auth-invoice-list';

describe('AuthInvoiceList', () => {
  let component: AuthInvoiceList;
  let fixture: ComponentFixture<AuthInvoiceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInvoiceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInvoiceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
