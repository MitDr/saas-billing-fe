import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuccessful } from './page-successful';

describe('PageSuccessful', () => {
  let component: PageSuccessful;
  let fixture: ComponentFixture<PageSuccessful>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSuccessful]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSuccessful);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
