import {Component, inject, input} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthWebhookEndpointDto} from '../../../../../../core/interface/DTO/auth/auth-webhook-endpoint-dto';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-auth-webhook-endpoint-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent
  ],
  templateUrl: './auth-webhook-endpoint-dto-card.html',
  styleUrl: './auth-webhook-endpoint-dto-card.css',
})
export class AuthWebhookEndpointDtoCard {
  webhookEndpoint = input.required<AuthWebhookEndpointDto>();
  numberOfColumn = input<number>(2);

  removable = input<boolean>(false);
  modalService = inject(NzModalService);
  // featureRemove = output<number>();
  private message = inject(NzMessageService);
}
