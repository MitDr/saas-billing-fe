import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointEdit } from './webhook-endpoint-edit';

describe('WebhookEndpointEdit', () => {
  let component: WebhookEndpointEdit;
  let fixture: ComponentFixture<WebhookEndpointEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
