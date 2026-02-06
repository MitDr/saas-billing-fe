import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantReuseForm } from './tenant-reuse-form';

describe('TenantReuseForm', () => {
  let component: TenantReuseForm;
  let fixture: ComponentFixture<TenantReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
