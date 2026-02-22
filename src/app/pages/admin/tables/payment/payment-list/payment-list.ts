import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Payment} from '../../../../../core/interface/entity/payment';
import {PAYMENT_ROUTE_CONSTANT} from '../../../../../core/constant/payment/payment-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {PaymentService} from '../../../../../core/service/payment-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {PaymentRequest} from '../../../../../core/interface/request/payment-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-payment-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList extends GenericListComponent<Payment, PaymentRequest> {
  paymentPage = signal<ListData<Payment> | null>(null);
  checked = false;
  createRoute = '/admin/tables/payments/create'
  paymentListRouting = PAYMENT_ROUTE_CONSTANT;
  private paymentService = inject(PaymentService);

  getDataPage(): Signal<ListData<Payment> | null> {
    return this.paymentPage;
  }

  override getColumns(): ColumnConfig<Payment>[] {
    return [
      {key: 'id', title: 'Id', type: 'text', editable: false},
      {key: 'amount', title: 'Amount', type: "text", editable: true},
      {key: 'status', title: 'Status', type: 'select', editable: true, options: PAYMENTSTATUSOPTION},
      {key: 'paymentIntentId', title: 'Intent Id', type: "text", editable: true},
      // {key: 'chargeId', title: 'Charge Id', type: 'text', editable: true},
      // {key: 'balanceTransactionId', title: 'B.Transaction Id', type: 'text', editable: true},
      {key: 'paymentMethod', title: 'Payment Method', type: "text", editable: true},
      {
        key: 'invoice',
        title: 'Invoice Number',
        type: 'custom',
        path: 'invoice.invoiceNumber',
        editable: false,
        formatUUID: true
      },
      {key: 'availableOn', title: 'Available On', type: 'date-time', editable: true, dateFormat: 'dd-MM-yyyy'},
      {key: 'softDelete', title: 'Soft Delete', type: 'select', editable: false, options: SOFTDELETEOPTIONS}

    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.paymentListRouting;
  }

  getService() {
    return this.paymentService;
  }

  // Handlers cho filters (fix UX: sync URL ngay)
  onSearchChange(value: string) {
    // Guard: Chỉ xử lý nếu value khác current (tránh loop từ ngModel)
    if (value !== this.search()) {
      // Với debounce: Next vào subject → sẽ set signal sau 300ms
      this.searchSubject.next(value);  // Nếu không dùng debounce, thay bằng: this.search.set(value); this.currentPage.set(1); this.syncUrl({ page: 1 });
    }
  }

  onSoftDeleteChange(value: boolean | null) {
    this.softDeleteFilter.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  onTenantChange(value: number | null) {
    this.tenantFilter.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  protected loadData(
    page: number,
    size: number,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort?: string  // Ignore cho Price
  ): void {
    this.loading.set(true);
    this.paymentService.getPayments(page, size, search, softDelete, tenantId).subscribe({
      next: (response) => {
        this.paymentPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách payments');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updatePayment: Payment): PaymentRequest {
    const result: PaymentRequest = {
      amount: updatePayment.amount,
      currency: updatePayment.currency,
      status: updatePayment.status,
      tenantId: updatePayment.tenant?.id!,
      metadata: updatePayment.metadata
    };

    if (updatePayment.paymentIntentId) {
      result.paymentIntentId = updatePayment.paymentIntentId;
    }

    if (updatePayment.chargeId) {
      result.chargeId = updatePayment.chargeId;
    }

    if (updatePayment.balanceTransactionId) {
      result.balanceTransactionId = updatePayment.balanceTransactionId;
    }

    if (updatePayment.paymentMethod) {
      result.paymentMethod = updatePayment.paymentMethod;
    }

    if (updatePayment.availableOn) {
      result.availableOn = updatePayment.availableOn;
    }

    if (updatePayment.invoice?.id) {
      result.invoiceId = updatePayment.invoice.id;
    }

    return result;
  }
}

export const PAYMENTSTATUSOPTION = [
  {label: 'Pending', value: 'PENDING', color: 'blue'},
  {label: 'Available', value: 'AVAILABLE', color: 'green'},
  {label: 'Refunded', value: 'REFUNDED', color: 'red'}
];
