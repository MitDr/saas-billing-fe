import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPriceDto} from '../../../../../../core/interface/DTO/auth/auth-price-dto';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {currencyDecimals} from '../../../payment/payment-card/payment-card';

@Component({
  selector: 'app-auth-price-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './auth-price-dto-card.html',
  styleUrl: './auth-price-dto-card.css',
})
export class AuthPriceDtoCard {
  price = input.required<AuthPriceDto>();
  numberOfColumn = input<number>(2);
  removable = input<boolean>(false);

  modalService = inject(NzModalService);
  priceRemove = output<number>();
  private message = inject(NzMessageService);

  onRemovePrice() {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: `Delete price #${this.price().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.priceRemove.emit(this.price().id);
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
