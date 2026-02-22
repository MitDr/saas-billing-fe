import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Payout} from '../../../../../core/interface/entity/payout';
import {FeatureDtoCard} from '../../DTO/feature-dto-card/feature-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {SubscriberDtoCard} from '../../DTO/subscriber-dto-card/subscriber-dto-card';
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-payout-card',
  imports: [
    FeatureDtoCard,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    SubscriberDtoCard,
    SubscriptionDtoCard,
    TenantDtoCard,
    RouterLink
  ],
  templateUrl: './payout-card.html',
  styleUrl: './payout-card.css',
})
export class PayoutCard {
  payout = input.required<Payout>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa payout #${this.payout().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.payout().id);
      }
    });
  }
}
