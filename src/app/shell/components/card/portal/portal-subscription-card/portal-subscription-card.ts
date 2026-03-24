import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthSubscriptionService} from '../../../../../core/service/auth/auth-subscription-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PortalSubscription} from '../../../../../core/interface/portal/portal-subscription';
import {AuthInvoiceDtoCard} from '../../DTO/auth/auth-invoice-dto-card/auth-invoice-dto-card';
import {AuthPriceDtoCard} from '../../DTO/auth/auth-price-dto-card/auth-price-dto-card';
import {AuthSubscriberDtoCard} from '../../DTO/auth/auth-subscriber-dto-card/auth-subscriber-dto-card';
import {JsonPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PortalPlanDtoCard} from '../../DTO/portal/portal-plan-dto-card/portal-plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';

@Component({
  selector: 'app-portal-subscription-card',
  imports: [
    AuthInvoiceDtoCard,
    AuthPriceDtoCard,
    AuthSubscriberDtoCard,
    JsonPipe,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    PortalPlanDtoCard,
    TenantDtoCard
  ],
  templateUrl: './portal-subscription-card.html',
  styleUrl: './portal-subscription-card.css',
})
export class PortalSubscriptionCard {
  subscription = input.required<PortalSubscription>()
  modalService = inject(NzModalService);
  changeMethod = output<number>();
  //Viết service cho portal
  subscriptionService = inject(AuthSubscriptionService)
  load = output<void>();
  private message = inject(NzMessageService);

  onChangeMethod(id: number) {
    this.changeMethod.emit(id);
  }
}
