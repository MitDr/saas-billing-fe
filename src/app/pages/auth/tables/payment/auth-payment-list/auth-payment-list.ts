import {Component, inject, Signal, signal} from '@angular/core';
import {AuthPayment} from '../../../../../core/interface/entity/auth/auth-payment';
import {AuthPaymentRequest} from '../../../../../core/interface/request/auth/auth-payment-request';
import {ListData} from '../../../../../core/interface/list-data';
import {AUTH_PAYMENT_ROUTE_CONSTANT} from '../../../../../core/constant/payment/payment-list-constant';
import {AuthPaymentService} from '../../../../../core/service/auth/auth-payment-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {PAYMENTSTATUSOPTION} from '../../../../admin/tables/payment/payment-list/payment-list';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';
import {CURRENCYOPTIONS} from '../../../../admin/tables/price/price-list/price-list';

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
export class AuthPaymentList extends AuthGenericListComponent<AuthPayment, AuthPaymentRequest> {

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
      {key: 'amount', title: 'Amount', type: "price", editable: false},
      {key: 'status', title: 'Status', type: 'select', editable: false, options: PAYMENTSTATUSOPTION},
      {key: 'currency', title: 'Currency', editable: false, type: 'select', options: CURRENCYOPTIONS},
      // {key: 'paymentIntentId', title: 'Intent Id', type: "text", editable: true},
      // {key: 'chargeId', title: 'Charge Id', type: 'text', editable: true},
      // {key: 'balanceTransactionId', title: 'B.Transaction Id', type: 'text', editable: true},
      // {key: 'paymentMethod', title: 'Payment Method', type: "text", editable: true},
      {
        key: 'invoice',
        title: 'Invoice Number',
        type: 'custom',
        path: 'invoice.invoiceNumber',
        editable: false,
        formatUUID: true
      },
      {key: 'availableOn', title: 'Available On', type: 'date-time', editable: false, dateFormat: 'dd-MM-yyyy'},
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
        this.message.error('Cannot load payments');
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

    if (updatePayment.availableOn) {
      result.availableOn = updatePayment.availableOn;
    }

    if (updatePayment.invoice?.id) {
      result.invoiceId = updatePayment.invoice.id;
    }

    return result;
  }
}
