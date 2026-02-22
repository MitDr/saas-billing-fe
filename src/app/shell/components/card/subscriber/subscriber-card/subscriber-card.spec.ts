import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberCard } from './subscriber-card';

describe('SubscriberCard', () => {
  let component: SubscriberCard;
  let fixture: ComponentFixture<SubscriberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
