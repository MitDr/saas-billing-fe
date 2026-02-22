import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
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
import {InvoiceCard} from '../../invoice/invoice-card/invoice-card';
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
    InvoiceCard,
    InvoiceDtoCard,
    JsonPipe
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
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Payment #${this.payment().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.payment().id);
      }
    });
  }
}
