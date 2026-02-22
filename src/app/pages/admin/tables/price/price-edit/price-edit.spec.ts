import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEdit } from './price-edit';

describe('PriceEdit', () => {
  let component: PriceEdit;
  let fixture: ComponentFixture<PriceEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
