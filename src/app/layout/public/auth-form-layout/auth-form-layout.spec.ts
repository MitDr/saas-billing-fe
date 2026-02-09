import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormLayout } from './auth-form-layout';

describe('AuthFormLayout', () => {
  let component: AuthFormLayout;
  let fixture: ComponentFixture<AuthFormLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
