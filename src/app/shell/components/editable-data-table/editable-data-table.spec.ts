import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDataTable } from './editable-data-table';

describe('EditableDataTable', () => {
  let component: EditableDataTable;
  let fixture: ComponentFixture<EditableDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableDataTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableDataTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
