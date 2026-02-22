import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCreate } from './price-create';

describe('PriceCreate', () => {
  let component: PriceCreate;
  let fixture: ComponentFixture<PriceCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
