import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointList } from './webhook-endpoint-list';

describe('WebhookEndpointList', () => {
  let component: WebhookEndpointList;
  let fixture: ComponentFixture<WebhookEndpointList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
