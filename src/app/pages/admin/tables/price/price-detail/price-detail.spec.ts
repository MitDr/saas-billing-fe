import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDetail } from './price-detail';

describe('PriceDetail', () => {
  let component: PriceDetail;
  let fixture: ComponentFixture<PriceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
