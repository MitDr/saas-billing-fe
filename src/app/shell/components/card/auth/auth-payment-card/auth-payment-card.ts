import {Component, inject, input, output} from '@angular/core';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPayment} from '../../../../../core/interface/entity/auth/auth-payment';
import {InvoiceDtoCard} from '../../DTO/invoice-dto-card/invoice-dto-card';
import {JsonPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {AuthInvoiceDtoCard} from '../../DTO/auth/auth-invoice-dto-card/auth-invoice-dto-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-payment-card',
  imports: [
    InvoiceDtoCard,
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
