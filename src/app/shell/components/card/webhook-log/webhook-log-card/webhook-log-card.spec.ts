import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookLogCard } from './webhook-log-card';

describe('WebhookLogCard', () => {
  let component: WebhookLogCard;
  let fixture: ComponentFixture<WebhookLogCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebhookLogCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebhookLogCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
