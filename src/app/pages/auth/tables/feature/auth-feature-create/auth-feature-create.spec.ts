import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureCreate } from './auth-feature-create';

describe('AuthFeatureCreate', () => {
  let component: AuthFeatureCreate;
  let fixture: ComponentFixture<AuthFeatureCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFeatureCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
