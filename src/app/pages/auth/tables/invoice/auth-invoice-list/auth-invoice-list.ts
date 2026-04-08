import {Component, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {AUTH_INVOICE_ROUTE_CONSTANT,} from '../../../../../core/constant/invoice/invoice-list-constant';
import {AuthInvoice} from '../../../../../core/interface/entity/auth/auth-invoice';
import {AuthInvoiceService} from '../../../../../core/service/auth/auth-invoice-service';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthInvoiceRequest} from '../../../../../core/interface/request/auth/auth-invoice-request';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {CURRENCYOPTION, INVOICESTATUSOPTION} from '../../../../admin/tables/invoice/invoice-list/invoice-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-invoice-list',
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
  templateUrl: './auth-invoice-list.html',
  styleUrl: './auth-invoice-list.css',
})
export class AuthInvoiceList extends AuthGenericListComponent<AuthInvoice, AuthInvoiceRequest> {
  invoicePage = signal<ListData<AuthInvoice> | null>(null);
  checked = false;
  createRoute = '/app/tables/invoices/create'
  invoiceListRouting = AUTH_INVOICE_ROUTE_CONSTANT;
  private invoiceService = inject(AuthInvoiceService);

  getDataPage() {
    return this.invoicePage;
  }

  override getColumns(): ColumnConfig<AuthInvoice>[] {
    return [
      {key: 'id', title: 'Id', editable: false, type: 'text'},
      {key: 'invoiceNumber', title: 'Number', editable: false, type: "text", formatUUID: true},
      {key: 'amount', title: 'Amount', editable: false, type: "price"},
      {key: 'currency', title: 'Currency', editable: false, type: 'select', options: CURRENCYOPTION},
      {key: 'status', title: 'Status', editable: false, type: 'select', options: INVOICESTATUSOPTION},
      {key: 'paidDate', title: 'Paid Date', editable: false, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      {key: 'billingPeriodEnd', title: 'Period End', editable: false, type: "date-time", dateFormat: 'dd-MM-yyyy'},
      {
        key: 'billingPeriodStart',
        title: 'Period Start',
        editable: true,
        type: 'date-time',
        dateFormat: 'dd-MM-yyyy'
      },
      // {key: 'amountUsd', title: 'Amount USD', editable: true, type: "text"},
      // {key: 'exchangeRate', title: 'Exchange Rate', editable: true, type: 'text'},
    ];
  }

  getCreateRoute() {
    return this.createRoute;
  }

  getRoutingConstant() {
    return this.invoiceListRouting;
  }

  getService() {
    return this.invoiceService;
  }

  onSearchChange(value: string) {
    this.search.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  protected loadData(page: number, size: number, search?: string, sort?: string) {
    this.loading.set(true);
    this.invoiceService.getInvoices(page, size, search).subscribe({ // No sort for Price
      next: (response) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page,
            size: this.pageSize(),
            search: this.search() || null,
          },
          queryParamsHandling: 'merge'
        });
        this.invoicePage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Cannot load invoice');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updateInvoice: AuthInvoice): AuthInvoiceRequest {
    const result: AuthInvoiceRequest = {
      amount: updateInvoice.amount,
      currency: updateInvoice.currency,
      status: updateInvoice.status,
      billingPeriodEnd: updateInvoice.billingPeriodEnd,
      billingPeriodStart: updateInvoice.billingPeriodStart,
      amountUsd: updateInvoice.amountUsd,
      exchangeRate: parseFloat(updateInvoice.exchangeRate),
      subscriberId: updateInvoice.subscriber.id,
      subscriptionId: updateInvoice.subscription.id
    }
    if (updateInvoice.paidDate) {
      result.paidDate = updateInvoice.paidDate
    }
    if (updateInvoice.metadata) {
      result.metadata = updateInvoice.metadata
    }

    return result;
  }
}
