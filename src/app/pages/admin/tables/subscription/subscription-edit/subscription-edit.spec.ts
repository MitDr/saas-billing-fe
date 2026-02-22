import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionEdit } from './subscription-edit';

describe('SubscriptionEdit', () => {
  let component: SubscriptionEdit;
  let fixture: ComponentFixture<SubscriptionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
