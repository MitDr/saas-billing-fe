import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTenant } from './auth-tenant';

describe('AuthTenant', () => {
  let component: AuthTenant;
  let fixture: ComponentFixture<AuthTenant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTenant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTenant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
