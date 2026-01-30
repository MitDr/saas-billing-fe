import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAuthLayout } from './dashboard-auth-layout';

describe('DashboardAuthLayout', () => {
  let component: DashboardAuthLayout;
  let fixture: ComponentFixture<DashboardAuthLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAuthLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAuthLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
