import {Component, inject, input, output} from '@angular/core';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Payment} from '../../../../../core/interface/entity/payment';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {JsonPipe, KeyValuePipe} from '@angular/common';
import {InvoiceDtoCard} from '../../DTO/invoice-dto-card/invoice-dto-card';

@Component({
  selector: 'app-payment-card',
  imports: [
    NzCardComponent,
    NzIconDirective,
    TenantDtoCard,
    NzTagComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    RouterLink,
    NzButtonComponent,
    KeyValuePipe,
    InvoiceDtoCard,
    JsonPipe,
    NzModalComponent
  ],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.css',
})
export class PaymentCard {

  payment = input.required<Payment>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);

  // load = output<number>();
  private message = inject(NzMessageService);

  get metadataObject(): Record<string, any> {
    const data = this.payment()?.metadata;

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
      nzTitle: 'Confirm Delete',
      nzContent: `Delete Payment #${this.payment().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.payment().id);
      }
    });
  }

  formatAmount(): string {
    const payment = this.payment();
    if (!payment || payment.amount == null) return '—';

    const amount = Number(payment.amount);
    if (isNaN(amount)) return String(payment.amount);

    const currency = payment.currency ?? 'USD';
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

export const currencyDecimals: { [code: string]: number } = {
  'USD': 2,
  'VND': 0
};
