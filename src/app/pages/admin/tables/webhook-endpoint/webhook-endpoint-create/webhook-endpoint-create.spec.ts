import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointCreate } from './webhook-endpoint-create';

describe('WebhookEndpointCreate', () => {
  let component: WebhookEndpointCreate;
  let fixture: ComponentFixture<WebhookEndpointCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
