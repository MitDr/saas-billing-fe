import {Component, inject, Signal, signal} from '@angular/core';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {AuthPayment} from '../../../../../core/interface/entity/auth/auth-payment';
import {AuthPaymentRequest} from '../../../../../core/interface/request/auth/auth-payment-request';
import {ListData} from '../../../../../core/interface/list-data';
import {Payment} from '../../../../../core/interface/entity/payment';
import {
  AUTH_PAYMENT_ROUTE_CONSTANT,
  PAYMENT_ROUTE_CONSTANT
} from '../../../../../core/constant/payment/payment-list-constant';
import {PaymentService} from '../../../../../core/service/payment-service';
import {AuthPaymentService} from '../../../../../core/service/auth/auth-payment-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../../../admin/tables/tenant/tenant-list/tenant-list';
import {PAYMENTSTATUSOPTION} from '../../../../admin/tables/payment/payment-list/payment-list';
import {PaymentRequest} from '../../../../../core/interface/request/payment-request';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-payment-list',
  imports: [
    EditableDataTable,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    RouterLink
  ],
  templateUrl: './auth-payment-list.html',
  styleUrl: './auth-payment-list.css',
})
export class AuthPaymentList extends AuthGenericListComponent<AuthPayment, AuthPaymentRequest>{

  paymentPage = signal<ListData<AuthPayment> | null>(null);
  checked = false;
  createRoute = '/app/tables/payments/create'
  paymentListRouting = AUTH_PAYMENT_ROUTE_CONSTANT;
  private paymentService = inject(AuthPaymentService);

  getDataPage(): Signal<ListData<AuthPayment> | null> {
    return this.paymentPage;
  }

  override getColumns(): ColumnConfig<AuthPayment>[] {
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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string  // Ignore cho Price
  ): void {
    this.loading.set(true);
    this.paymentService.getPayments(page, size, search).subscribe({
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
  protected mapToUpdatePayload(updatePayment: AuthPayment): AuthPaymentRequest {
    const result: AuthPaymentRequest = {
      amount: updatePayment.amount,
      currency: updatePayment.currency,
      status: updatePayment.status,
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
