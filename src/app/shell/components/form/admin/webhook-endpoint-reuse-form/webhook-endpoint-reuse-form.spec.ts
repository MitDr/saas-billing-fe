import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEndpointReuseForm } from './webhook-endpoint-reuse-form';

describe('WebhookEndpointReuseForm', () => {
  let component: WebhookEndpointReuseForm;
  let fixture: ComponentFixture<WebhookEndpointReuseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookEndpointReuseForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookEndpointReuseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
