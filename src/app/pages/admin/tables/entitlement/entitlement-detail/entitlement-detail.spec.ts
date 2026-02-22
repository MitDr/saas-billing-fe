import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementDetail } from './entitlement-detail';

describe('EntitlementDetail', () => {
  let component: EntitlementDetail;
  let fixture: ComponentFixture<EntitlementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
