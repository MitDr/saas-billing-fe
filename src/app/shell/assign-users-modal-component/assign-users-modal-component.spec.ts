import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUsersModalComponent } from './assign-users-modal-component';

describe('AssignUsersModalComponent', () => {
  let component: AssignUsersModalComponent;
  let fixture: ComponentFixture<AssignUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignUsersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignUsersModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
