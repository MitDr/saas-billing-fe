import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureReuseForm } from './feature-reuse-form';

describe('FeatureReuseForm', () => {
  let component: FeatureReuseForm;
  let fixture: ComponentFixture<FeatureReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
