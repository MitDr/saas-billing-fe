import {Component, inject, input} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookEndpointDTO} from '../../../../../core/interface/DTO/webhookEndpointDTO';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-webhook-endpoint-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './webhook-endpoint-dto-card.html',
  styleUrl: './webhook-endpoint-dto-card.css',
})
export class WebhookEndpointDtoCard {
  webhookEndpoint = input.required<WebhookEndpointDTO>();
  numberOfColumn = input<number>(2);

  removable = input<boolean>(false);
  modalService = inject(NzModalService);
  // featureRemove = output<number>();
  private message = inject(NzMessageService);
}
