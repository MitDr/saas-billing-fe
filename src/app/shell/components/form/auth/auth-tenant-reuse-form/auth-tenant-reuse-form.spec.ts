import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTenantReuseForm } from './auth-tenant-reuse-form';

describe('AuthTenantReuseForm', () => {
  let component: AuthTenantReuseForm;
  let fixture: ComponentFixture<AuthTenantReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTenantReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTenantReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
