import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {AuthPlanDtoCard} from '../../DTO/auth/auth-plan-dto-card/auth-plan-dto-card';
import {RouterLink} from '@angular/router';
import {currencyDecimals} from '../../payment/payment-card/payment-card';

@Component({
  selector: 'app-auth-price-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    PlanDtoCard,
    TenantDtoCard,
    AuthPlanDtoCard,
    RouterLink
  ],
  templateUrl: './auth-price-card.html',
  styleUrl: './auth-price-card.css',
})
export class AuthPriceCard {
  price = input.required<AuthPrice>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // priceService = inject(PriceService)
  load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Confirm',
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
