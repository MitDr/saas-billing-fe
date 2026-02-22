import {Component, inject, input, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {UserDtoCard} from '../../DTO/user-dto-card/user-dto-card';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {RouterLink} from '@angular/router';
import {TenantCard} from '../../tenant/tenant-card/tenant-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';
import {FeatureDtoCard} from '../../DTO/feature-dto-card/feature-dto-card';
import {SubscriberDtoCard} from '../../DTO/subscriber-dto-card/subscriber-dto-card';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-entitlement-card',
  imports: [
    DecimalPipe,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    NzTagComponent,
    NzTooltipDirective,
    UserDtoCard,
    RouterLink,
    TenantCard,
    TenantDtoCard,
    SubscriptionDtoCard,
    FeatureDtoCard,
    SubscriberDtoCard,
    NzModalModule
  ],
  templateUrl: './entitlement-card.html',
  styleUrl: './entitlement-card.css',
})
export class EntitlementCard {
  entitlement = input.required<Entitlement>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Entitlement #${this.entitlement().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.entitlement().id);
      }
    });
  }

}
