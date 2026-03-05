import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementCheck } from './entitlement-check';

describe('EntitlementCheck', () => {
  let component: EntitlementCheck;
  let fixture: ComponentFixture<EntitlementCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementCheck);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
