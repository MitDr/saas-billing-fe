import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementCard } from './entitlement-card';

describe('EntitlementCard', () => {
  let component: EntitlementCard;
  let fixture: ComponentFixture<EntitlementCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
