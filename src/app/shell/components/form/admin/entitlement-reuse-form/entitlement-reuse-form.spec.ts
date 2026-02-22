import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementReuseForm } from './entitlement-reuse-form';

describe('EntitlementReuseForm', () => {
  let component: EntitlementReuseForm;
  let fixture: ComponentFixture<EntitlementReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
