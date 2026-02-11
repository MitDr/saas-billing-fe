import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementList } from './entitlement-list';

describe('EntitlementList', () => {
  let component: EntitlementList;
  let fixture: ComponentFixture<EntitlementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
