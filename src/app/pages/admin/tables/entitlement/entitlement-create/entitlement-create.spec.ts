import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementCreate } from './entitlement-create';

describe('EntitlementCreate', () => {
  let component: EntitlementCreate;
  let fixture: ComponentFixture<EntitlementCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitlementCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitlementCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
