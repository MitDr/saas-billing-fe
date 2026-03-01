import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureReuseForm } from './auth-feature-reuse-form';

describe('AuthFeatureReuseForm', () => {
  let component: AuthFeatureReuseForm;
  let fixture: ComponentFixture<AuthFeatureReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFeatureReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
