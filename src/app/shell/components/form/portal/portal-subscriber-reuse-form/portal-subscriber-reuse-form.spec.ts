import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSubscriberReuseForm } from './portal-subscriber-reuse-form';

describe('PortalSubscriberReuseForm', () => {
  let component: PortalSubscriberReuseForm;
  let fixture: ComponentFixture<PortalSubscriberReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalSubscriberReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalSubscriberReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
