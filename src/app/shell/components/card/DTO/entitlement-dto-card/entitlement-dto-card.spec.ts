import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementDtoCard } from './entitlement-dto-card';

describe('EntitlementDtoCard', () => {
  let component: EntitlementDtoCard;
  let fixture: ComponentFixture<EntitlementDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
