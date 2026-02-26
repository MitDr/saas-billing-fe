import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWebhookEndpointList } from './auth-webhook-endpoint-list';

describe('AuthWebhookEndpointList', () => {
  let component: AuthWebhookEndpointList;
  let fixture: ComponentFixture<AuthWebhookEndpointList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWebhookEndpointList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWebhookEndpointList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
