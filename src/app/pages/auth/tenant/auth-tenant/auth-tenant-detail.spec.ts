import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthTenantDetail} from './auth-tenant-detail';

describe('AuthTenantDetail', () => {
  let component: AuthTenantDetail;
  let fixture: ComponentFixture<AuthTenantDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTenantDetail]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthTenantDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
