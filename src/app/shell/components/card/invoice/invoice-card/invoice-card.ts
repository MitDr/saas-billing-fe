import {Component, inject, input, output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {FeatureDtoCard} from '../../DTO/feature-dto-card/feature-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {SubscriberDtoCard} from '../../DTO/subscriber-dto-card/subscriber-dto-card';
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {RouterLink} from '@angular/router';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {JsonPipe, KeyValuePipe, NgForOf} from '@angular/common';
import {currencyDecimals} from '../../payment/payment-card/payment-card';

@Component({
  selector: 'app-invoice-card',
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
    NzPopconfirmDirective,
    NzTooltipDirective,
    RouterLink,
    NzModalModule,
    JsonPipe,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './invoice-card.html',
  styleUrl: './invoice-card.css',
})
export class InvoiceCard {
  invoice = input.required<Invoice>()
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  private message = inject(NzMessageService);

  get metadataObject(): Record<string, any> {
    const data = this.invoice()?.metadata;

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

  maskInvoiceNumber(key: string): string {
    if (!key || key.length < 10) return 'N/A';
    const start = key.slice(0, 6);
    const end = key.slice(-4);
    return `${start}...${end}`;
  }

  copyInvoiceNumber(key: string): void {
    if (!key) {
      this.message.error('There are no API Keys to copy');
      return;
    }

    navigator.clipboard.writeText(key)
      .then(() => {
        this.message.success('API Key has been copied to clipboard!');
      })
      .catch(() => {
        this.message.error('Cannot copy, Please try again later!');
      });
  }

  onDelete(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: `Delete Invoice ${this.invoice().invoiceNumber} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.invoice().id);
      }
    });
  }

  formatAmount(): string {
    const invoice = this.invoice();
    if (!invoice || invoice.amount == null) return '—';

    const amount = Number(invoice.amount);
    if (isNaN(amount)) return String(invoice.amount);

    const currency = invoice.currency ?? 'USD';
    const decimals = currencyDecimals[currency.toUpperCase()] ?? 2;

    const majorAmount = amount / Math.pow(10, decimals);

    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(majorAmount);
  }

  formatAmountUsd(): string {
    const invoice = this.invoice();
    if (!invoice || invoice.amountUsd == null) return '—';

    const amount = Number(invoice.amountUsd);
    if (isNaN(amount)) return String(invoice.amountUsd);

    const currency = 'USD';
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
