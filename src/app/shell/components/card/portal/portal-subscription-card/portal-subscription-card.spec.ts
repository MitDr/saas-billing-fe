import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSubscriptionCard } from './portal-subscription-card';

describe('PortalSubscriptionCard', () => {
  let component: PortalSubscriptionCard;
  let fixture: ComponentFixture<PortalSubscriptionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalSubscriptionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalSubscriptionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
