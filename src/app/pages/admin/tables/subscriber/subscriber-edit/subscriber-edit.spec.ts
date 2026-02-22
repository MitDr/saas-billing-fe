import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberEdit } from './subscriber-edit';

describe('SubscriberEdit', () => {
  let component: SubscriberEdit;
  let fixture: ComponentFixture<SubscriberEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
