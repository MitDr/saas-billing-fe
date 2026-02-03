import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReuseForm } from './user-reuse-form';

describe('UserReuseForm', () => {
  let component: UserReuseForm;
  let fixture: ComponentFixture<UserReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
