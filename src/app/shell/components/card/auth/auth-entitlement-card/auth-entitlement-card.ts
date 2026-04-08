import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FeatureDtoCard} from '../../DTO/feature-dto-card/feature-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {SubscriberDtoCard} from '../../DTO/subscriber-dto-card/subscriber-dto-card';
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {AuthEntitlement} from '../../../../../core/interface/entity/auth/auth-entitlement';
import {AuthSubscriptionDtoCard} from '../../DTO/auth/auth-subscription-dto-card/auth-subscription-dto-card';
import {AuthFeatureDtoCard} from '../../DTO/auth/auth-feature-dto-card/auth-feature-dto-card';
import {AuthSubscriberDtoCard} from '../../DTO/auth/auth-subscriber-dto-card/auth-subscriber-dto-card';

@Component({
  selector: 'app-auth-entitlement-card',
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
    AuthSubscriptionDtoCard,
    AuthFeatureDtoCard,
    AuthSubscriberDtoCard
  ],
  templateUrl: './auth-entitlement-card.html',
  styleUrl: './auth-entitlement-card.css',
})
export class AuthEntitlementCard {
  entitlement = input.required<AuthEntitlement>()
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Confirm delete',
      nzContent: `Delete Entitlement #${this.entitlement().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.entitlement().id);
      }
    });
  }
}
