import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiDoc } from './ai-doc';

describe('AiDoc', () => {
  let component: AiDoc;
  let fixture: ComponentFixture<AiDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiDoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
