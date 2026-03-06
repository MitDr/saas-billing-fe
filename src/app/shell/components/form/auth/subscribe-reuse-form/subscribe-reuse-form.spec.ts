import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeReuseForm } from './subscribe-reuse-form';

describe('SubscribeReuseForm', () => {
  let component: SubscribeReuseForm;
  let fixture: ComponentFixture<SubscribeReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
