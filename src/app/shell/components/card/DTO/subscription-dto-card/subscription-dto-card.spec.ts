import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDtoCard } from './subscription-dto-card';

describe('SubscriptionDtoCard', () => {
  let component: SubscriptionDtoCard;
  let fixture: ComponentFixture<SubscriptionDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
