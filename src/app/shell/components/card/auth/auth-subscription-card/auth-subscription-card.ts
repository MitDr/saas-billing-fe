import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscription} from '../../../../../core/interface/entity/auth/auth-subscription';
import {AuthSubscriptionService} from '../../../../../core/service/auth/auth-subscription-service';
import {AuthSubscriptionRequest} from '../../../../../core/interface/request/auth/auth-subscription-request';
import {InvoiceDtoCard} from '../../DTO/invoice-dto-card/invoice-dto-card';
import {JsonPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PriceDtoCard} from '../../DTO/price-dto-card/price-dto-card';
import {SubscriberDtoCard} from '../../DTO/subscriber-dto-card/subscriber-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {AuthInvoiceDtoCard} from '../../DTO/auth/auth-invoice-dto-card/auth-invoice-dto-card';
import {AuthPriceDtoCard} from '../../DTO/auth/auth-price-dto-card/auth-price-dto-card';
import {AuthSubscriberDtoCard} from '../../DTO/auth/auth-subscriber-dto-card/auth-subscriber-dto-card';

@Component({
  selector: 'app-auth-subscription-card',
  imports: [
    InvoiceDtoCard,
    JsonPipe,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    PriceDtoCard,
    SubscriberDtoCard,
    TenantDtoCard,
    AuthInvoiceDtoCard,
    AuthPriceDtoCard,
    AuthSubscriberDtoCard
  ],
  templateUrl: './auth-subscription-card.html',
  styleUrl: './auth-subscription-card.css',
})
export class AuthSubscriptionCard {
  subscription = input.required<AuthSubscription>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  subscriptionService = inject(AuthSubscriptionService)
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

  private removeInvoiceAndMapSubscriptionToSubscriptionRequest(subscription: AuthSubscription, id: number) {
    const result: AuthSubscriptionRequest = {
      status: subscription.status,
      quantity: subscription.quantity,
      isTrial: subscription.trial,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      dueDate: subscription.dueDate,
      subscriberId: subscription.subscriber.id,
      priceId: subscription.price.id,
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
