import {Component, inject, input, output} from '@angular/core';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPayment} from '../../../../../core/interface/entity/auth/auth-payment';
import {JsonPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {AuthInvoiceDtoCard} from '../../DTO/auth/auth-invoice-dto-card/auth-invoice-dto-card';
import {RouterLink} from '@angular/router';
import {currencyDecimals} from '../../payment/payment-card/payment-card';

@Component({
  selector: 'app-auth-payment-card',
  imports: [
    JsonPipe,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    TenantDtoCard,
    AuthInvoiceDtoCard,
    RouterLink,
    NzModalComponent
  ],
  templateUrl: './auth-payment-card.html',
  styleUrl: './auth-payment-card.css',
})
export class AuthPaymentCard {
  payment = input.required<AuthPayment>()
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
      nzTitle: 'Confirm delete',
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
