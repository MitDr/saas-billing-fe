import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookLog} from '../../../../../core/interface/entity/webhook-log';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {JsonPipe, KeyValuePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {WebhookEndpointDtoCard} from '../../DTO/webhook-endpoint-dto-card/webhook-endpoint-dto-card';

@Component({
  selector: 'app-webhook-log-card',
  imports: [
    EntitlementDtoCard,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    PlanDtoCard,
    TenantDtoCard,
    KeyValuePipe,
    RouterLink,
    WebhookEndpointDtoCard,
    JsonPipe
  ],
  templateUrl: './webhook-log-card.html',
  styleUrl: './webhook-log-card.css',
})
export class WebhookLogCard {
  webhookLog = input.required<WebhookLog>()
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
