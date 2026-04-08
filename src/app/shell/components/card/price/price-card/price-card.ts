import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Price} from '../../../../../core/interface/entity/price';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {currencyDecimals} from '../../payment/payment-card/payment-card';

@Component({
  selector: 'app-price-card',
  imports: [
    NzCardComponent,
    NzTagComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    RouterLink,
    NzButtonComponent,
    NzIconDirective,
    TenantDtoCard,
    PlanDtoCard
  ],
  templateUrl: './price-card.html',
  styleUrl: './price-card.css',
})
export class PriceCard {
  price = input.required<Price>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // priceService = inject(PriceService)
  load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: `Delete Price #${this.price().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.price().id);
      }
    });
  }

  formatAmount(): string {
    const price = this.price();
    if (!price || price.price == null) return '—';

    const amount = Number(price.price);
    if (isNaN(amount)) return String(price.price);

    const currency = price.currency ?? 'USD';
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
