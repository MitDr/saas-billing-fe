import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureDetail } from './auth-feature-detail';

describe('AuthFeatureDetail', () => {
  let component: AuthFeatureDetail;
  let fixture: ComponentFixture<AuthFeatureDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFeatureDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
