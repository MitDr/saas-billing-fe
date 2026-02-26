import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureAuthList } from './feature-auth-list';

describe('FeatureAuthList', () => {
  let component: FeatureAuthList;
  let fixture: ComponentFixture<FeatureAuthList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureAuthList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureAuthList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
