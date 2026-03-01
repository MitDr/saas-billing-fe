import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthWebhookLog} from '../../../../../core/interface/entity/auth/auth-webhook-log';
import {JsonPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {WebhookEndpointDtoCard} from '../../DTO/webhook-endpoint-dto-card/webhook-endpoint-dto-card';
import {AuthWebhookEndpointCard} from '../auth-webhook-endpoint-card/auth-webhook-endpoint-card';
import {AuthWebhookEndpointDtoCard} from '../../DTO/auth/auth-webhook-endpoint-dto-card/auth-webhook-endpoint-dto-card';

@Component({
  selector: 'app-auth-webhook-log-card',
  imports: [
    JsonPipe,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    WebhookEndpointDtoCard,
    AuthWebhookEndpointCard,
    AuthWebhookEndpointDtoCard
  ],
  templateUrl: './auth-webhook-log-card.html',
  styleUrl: './auth-webhook-log-card.css',
})
export class AuthWebhookLogCard {
  webhookLog = input.required<AuthWebhookLog>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // webhook = inject(FeatureService)
  load = output<number>();
  private message = inject(NzMessageService);

  get metadataObject(): Record<string, any> {
    const data = this.webhookLog()?.data;

    if (!data) return {};

    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch {
        return {};
      }
    }

    return data;
  }


  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa webhook log #${this.webhookLog().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.webhookLog().id);
      }
    });
  }
}
