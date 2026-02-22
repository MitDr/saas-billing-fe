import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageReuseForm } from './image-reuse-form';

describe('ImageReuseForm', () => {
  let component: ImageReuseForm;
  let fixture: ComponentFixture<ImageReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
