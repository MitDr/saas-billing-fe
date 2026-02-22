import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberDtoCard } from './subscriber-dto-card';

describe('SubscriberDtoCard', () => {
  let component: SubscriberDtoCard;
  let fixture: ComponentFixture<SubscriberDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
