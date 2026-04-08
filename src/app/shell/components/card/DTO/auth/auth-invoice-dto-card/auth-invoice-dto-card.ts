import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthInvoiceDto} from '../../../../../../core/interface/DTO/auth/auth-invoice-dto';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {currencyDecimals} from '../../../payment/payment-card/payment-card';

@Component({
  selector: 'app-auth-invoice-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    NzTooltipDirective
  ],
  templateUrl: './auth-invoice-dto-card.html',
  styleUrl: './auth-invoice-dto-card.css',
})
export class AuthInvoiceDtoCard {
  invoice = input.required<AuthInvoiceDto>();
  numberOfColumn = input<number>(2);
  removable = input<boolean>(false);

  modalService = inject(NzModalService);
  planRemove = output<number>();

  private message = inject(NzMessageService);

  onRemoveInvoice() {
    this.modalService.confirm({
      nzTitle: 'Confirm delete',
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
      this.message.error('There is no invoice number');
      return;
    }

    navigator.clipboard.writeText(key)
      .then(() => {
        this.message.success('Invoice number has been copied to clipboard');
      })
      .catch(() => {
        this.message.error('Cannot copy, please try again later');
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
