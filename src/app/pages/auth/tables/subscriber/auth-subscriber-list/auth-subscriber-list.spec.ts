import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriberList } from './auth-subscriber-list';

describe('AuthSubscriberList', () => {
  let component: AuthSubscriberList;
  let fixture: ComponentFixture<AuthSubscriberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubscriberList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubscriberList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
