import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscription} from '../../../../../core/interface/entity/subscription';
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
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';
import {SubscriberDtoCard} from '../../DTO/subscriber-dto-card/subscriber-dto-card';
import {PriceDtoCard} from '../../DTO/price-dto-card/price-dto-card';
import {InvoiceDtoCard} from '../../DTO/invoice-dto-card/invoice-dto-card';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {SubscriptionRequest} from '../../../../../core/interface/request/subscription-request';

@Component({
  selector: 'app-subscription-card',
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
    SubscriptionDtoCard,
    SubscriberDtoCard,
    PriceDtoCard,
    InvoiceDtoCard,
    JsonPipe
  ],
  templateUrl: './subscription-card.html',
  styleUrl: './subscription-card.css',
})
export class SubscriptionCard {
  subscription = input.required<Subscription>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  subscriptionService = inject(SubscriptionService)
  load = output<number>();
  private message = inject(NzMessageService);

  get metadataObject(): Record<string, any> {
    const data = this.subscription()?.metadata;

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
      nzContent: `Xóa Subscription #${this.subscription().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.subscription().id);
      }
    });
  }

  onInvoiceRemoved(id: number) {
    this.subscriptionService.update(this.removeInvoiceAndMapSubscriptionToSubscriptionRequest(this.subscription(), id), this.subscription().id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.load.emit(this.subscription().id);
      },
      error: () => {
        this.message.error('Update failed');
        this.load.emit(this.subscription().id);
      }
    });
  }

  private removeInvoiceAndMapSubscriptionToSubscriptionRequest(subscription: Subscription, id: number) {
    const result: SubscriptionRequest = {
      status: subscription.status,
      quantity: subscription.quantity,
      isTrial: subscription.trial,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      dueDate: subscription.dueDate,
      subscriberId: subscription.subscriber.id,
      priceId: subscription.price.id,
      tenantId: subscription.tenant.id,
    }
    if (subscription.cancelDate) {
      result.cancelDate = subscription.cancelDate;
    }
    if (subscription.invoices.length > 0) {
      result.invoices = subscription.invoices
        .filter(invoice => invoice.id !== id)
        .map(invoice => invoice.id);
    }
    if (subscription.metadata) {
      result.metadata = subscription.metadata;
    }
    return result;
  }
}
