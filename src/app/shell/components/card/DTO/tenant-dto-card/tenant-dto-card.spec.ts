import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDtoCard } from './tenant-dto-card';

describe('TenantDtoCard', () => {
  let component: TenantDtoCard;
  let fixture: ComponentFixture<TenantDtoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDtoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantDtoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
