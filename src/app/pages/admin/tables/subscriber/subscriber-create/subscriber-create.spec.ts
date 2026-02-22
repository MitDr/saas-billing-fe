import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberCreate } from './subscriber-create';

describe('SubscriberCreate', () => {
  let component: SubscriberCreate;
  let fixture: ComponentFixture<SubscriberCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
