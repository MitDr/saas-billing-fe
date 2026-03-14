import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSubscriberCard } from './portal-subscriber-card';

describe('PortalSubscriberCard', () => {
  let component: PortalSubscriberCard;
  let fixture: ComponentFixture<PortalSubscriberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalSubscriberCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalSubscriberCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
