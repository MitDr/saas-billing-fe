import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenantTable } from './top-tenant-table';

describe('TopTenantTable', () => {
  let component: TopTenantTable;
  let fixture: ComponentFixture<TopTenantTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTenantTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTenantTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
