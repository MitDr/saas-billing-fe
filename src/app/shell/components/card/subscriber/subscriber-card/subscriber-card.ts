import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';

@Component({
  selector: 'app-subscriber-card',
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
    RouterLink,
    SubscriptionDtoCard
  ],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.css',
})
export class SubscriberCard {
  subscriber = input.required<Subscriber>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // subscriberService = inject(SubscriberService)
  load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Subscriber #${this.subscriber().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.subscriber().id);
      }
    });
  }

}
