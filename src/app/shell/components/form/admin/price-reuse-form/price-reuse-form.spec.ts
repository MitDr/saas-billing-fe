import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReuseForm } from './price-reuse-form';

describe('PriceReuseForm', () => {
  let component: PriceReuseForm;
  let fixture: ComponentFixture<PriceReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
