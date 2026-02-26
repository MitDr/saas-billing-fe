import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedRenewalTable } from './expected-renewal-table';

describe('ExpectedRenewalTable', () => {
  let component: ExpectedRenewalTable;
  let fixture: ComponentFixture<ExpectedRenewalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedRenewalTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpectedRenewalTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
