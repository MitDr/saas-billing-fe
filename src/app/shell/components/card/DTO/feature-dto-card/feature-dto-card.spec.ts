import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDtoCard } from './feature-dto-card';

describe('FeatureDtoCard', () => {
  let component: FeatureDtoCard;
  let fixture: ComponentFixture<FeatureDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
