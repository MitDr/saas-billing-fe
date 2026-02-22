import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookEndpoint} from '../../../../../core/interface/entity/webhook-endpoint';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-webhook-endpoint-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    EntitlementDtoCard,
    PlanDtoCard,
    TenantDtoCard,
    RouterLink
  ],
  templateUrl: './webhook-endpoint-card.html',
  styleUrl: './webhook-endpoint-card.css',
})
export class WebhookEndpointCard {
  webhookEndpoint = input.required<WebhookEndpoint>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // = inject(FeatureService)
  load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa webhook endpont #${this.webhookEndpoint().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.webhookEndpoint().id);
      }
    });
  }
}
