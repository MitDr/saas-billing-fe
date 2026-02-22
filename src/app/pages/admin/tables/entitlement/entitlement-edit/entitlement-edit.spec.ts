import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementEdit } from './entitlement-edit';

describe('EntitlementEdit', () => {
  let component: EntitlementEdit;
  let fixture: ComponentFixture<EntitlementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
