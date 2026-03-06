import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTenantCard } from './auth-tenant-card';

describe('AuthTenantCard', () => {
  let component: AuthTenantCard;
  let fixture: ComponentFixture<AuthTenantCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTenantCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTenantCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
