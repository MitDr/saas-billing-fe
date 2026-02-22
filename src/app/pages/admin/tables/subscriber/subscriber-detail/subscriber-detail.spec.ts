import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberDetail } from './subscriber-detail';

describe('SubscriberDetail', () => {
  let component: SubscriberDetail;
  let fixture: ComponentFixture<SubscriberDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
