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

  onDelete(): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Invoice ${this.invoice().invoiceNumber} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.invoice().id);
      }
    });
  }


}
