import {Component, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {INVOICE_ROUTE_CONSTANT} from '../../../../../core/constant/invoice/invoice-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {InvoiceRequest} from '../../../../../core/interface/request/invoice-request';
import {NzInputDirective, NzInputGroupComponent, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';

@Component({
  selector: 'app-invoice-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink,
    NzInputGroupComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    FormsModule,
    NzInputDirective,
    NzInputWrapperComponent
  ],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceList extends GenericListComponent<Invoice, InvoiceRequest> {
  invoicePage = signal<ListData<Invoice> | null>(null);
  checked = false;
  createRoute = '/admin/tables/invoices/create'
  invoiceListRouting = INVOICE_ROUTE_CONSTANT;
  private invoiceService = inject(InvoiceService);

  getDataPage() {
    return this.invoicePage;
  }

  override getColumns(): ColumnConfig<Invoice>[] {
    return [
      {key: 'id', title: 'Id', editable: false, type: 'text'},
      {key: 'invoiceNumber', title: 'Number', editable: false, type: "text", formatUUID: true},
      {key: 'amount', title: 'Amount', editable: true, type: "text"},
      {key: 'currency', title: 'Currency', editable: true, type: 'select', options: CURRENCYOPTION},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: INVOICESTATUSOPTION},
      {key: 'paidDate', title: 'Paid Date', editable: true, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      {key: 'billingPeriodEnd', title: 'Period End', editable: true, type: "date-time", dateFormat: 'dd-MM-yyyy'},
      {key: 'billingPeriodStart', title: 'Period Start', editable: true, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      // {key: 'amountUsd', title: 'Amount USD', editable: true, type: "text"},
      // {key: 'exchangeRate', title: 'Exchange Rate', editable: true, type: 'text'},
      {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS}
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

  // Handlers cho filters (fix UX: sync URL ngay)
  onSearchChange(value: string) {
    this.search.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
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


  protected loadData(page: number, size: number, search?: string, softDelete?: boolean | null, tenantId?: number | null, sort?: string) {
    this.loading.set(true);
    this.invoiceService.getInvoices(page, size, search, softDelete, tenantId).subscribe({ // No sort for Price
      next: (response) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page,
            size: this.pageSize(),
            search: this.search() || null,
            softDelete: this.softDeleteFilter(),
            tenantId: this.tenantFilter()
          },
          queryParamsHandling: 'merge'
        });
        this.invoicePage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách invoice');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updateInvoice: Invoice): InvoiceRequest {
    const result: InvoiceRequest = {
      amount: updateInvoice.amount,
      currency: updateInvoice.currency,
      status: updateInvoice.status,
      billingPeriodEnd: updateInvoice.billingPeriodEnd,
      billingPeriodStart: updateInvoice.billingPeriodStart,
      amountUsd: updateInvoice.amountUsd,
      exchangeRate: parseFloat(updateInvoice.exchangeRate),
      subscriberId: updateInvoice.subscriber.id,
      tenantId: updateInvoice.tenant.id,
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

export const CURRENCYOPTION = [
  {label: 'Usd', value: 'USD', color: 'green'},
  {label: 'Vnd', value: 'VND', color: 'red'}
]

export const INVOICESTATUSOPTION = [
  {label: 'Paid', value: 'PAID', color: 'green'},
  {label: 'Draft', value: 'DRAFT', color: 'blue'},
  {label: 'Unpaid', value: 'UNPAID', color: 'red'},
  {label: 'Void', value: 'VOID', color: 'grey'}
]
