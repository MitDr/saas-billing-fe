import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCreate } from './image-create';

describe('ImageCreate', () => {
  let component: ImageCreate;
  let fixture: ComponentFixture<ImageCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
