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
import {currencyDecimals} from '../../payment/payment-card/payment-card';

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
      nzTitle: 'Confirm Delete',
      nzContent: `Delete payout #${this.payout().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.payout().id);
      }
    });
  }

  formatAmount(): string {
    const payout = this.payout();
    if (!payout || payout.amount == null) return '—';

    const amount = Number(payout.amount);
    if (isNaN(amount)) return String(payout.amount);

    const currency = payout.currency ?? 'USD';
    const decimals = currencyDecimals[currency.toUpperCase()] ?? 2;

    const majorAmount = amount / Math.pow(10, decimals);

    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(majorAmount);
  }
}
