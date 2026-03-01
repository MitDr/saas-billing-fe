import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureEdit } from './auth-feature-edit';

describe('AuthFeatureEdit', () => {
  let component: AuthFeatureEdit;
  let fixture: ComponentFixture<AuthFeatureEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFeatureEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
