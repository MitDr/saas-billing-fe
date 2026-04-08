import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {InvoiceDTO} from '../../../../../core/interface/DTO/InvoiceDTO';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzImageDirective} from 'ng-zorro-antd/image';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {KeyValuePipe} from '@angular/common';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {SubscriberDtoCard} from '../subscriber-dto-card/subscriber-dto-card';
import {SubscriptionDtoCard} from '../subscription-dto-card/subscription-dto-card';
import {TenantDtoCard} from '../tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';
import {currencyDecimals} from '../../payment/payment-card/payment-card';

@Component({
  selector: 'app-invoice-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzImageDirective,
    NzTagComponent,
    KeyValuePipe,
    NzTooltipDirective,
    SubscriberDtoCard,
    SubscriptionDtoCard,
    TenantDtoCard,
    RouterLink
  ],
  templateUrl: './invoice-dto-card.html',
  styleUrl: './invoice-dto-card.css',
})
export class InvoiceDtoCard {
  invoice = input.required<InvoiceDTO>();
  numberOfColumn = input<number>(2);
  removable = input<boolean>(false);

  modalService = inject(NzModalService);
  planRemove = output<number>();

  private message = inject(NzMessageService);

  onRemoveInvoice() {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: `Delete Invoice #${this.invoice().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.planRemove.emit(this.invoice().id);
      }
    });
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
        this.message.success('API Key has been copied to clipboard');
      })
      .catch(() => {
        this.message.error('Cannot copy, Please try again later!');

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
}
