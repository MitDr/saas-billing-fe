import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDtoCard } from './invoice-dto-card';

describe('InvoiceDtoCard', () => {
  let component: InvoiceDtoCard;
  let fixture: ComponentFixture<InvoiceDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
