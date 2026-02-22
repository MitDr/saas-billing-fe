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
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Invoice #${this.invoice().id} ?`,
      nzOkText: 'Xóa',
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
      this.message.error('Không có API Key để copy');
      return;
    }

    navigator.clipboard.writeText(key)
      .then(() => {
        this.message.success('API Key đã được copy vào clipboard!');
      })
      .catch(() => {
        this.message.error('Không thể copy, vui lòng thử lại');
      });
  }
  
}
