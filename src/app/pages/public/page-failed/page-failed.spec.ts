import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFailed } from './page-failed';

describe('PageFailed', () => {
  let component: PageFailed;
  let fixture: ComponentFixture<PageFailed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFailed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFailed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
