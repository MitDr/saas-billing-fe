import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReuseForm } from './invoice-reuse-form';

describe('InvoiceReuseForm', () => {
  let component: InvoiceReuseForm;
  let fixture: ComponentFixture<InvoiceReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
