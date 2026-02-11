import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {INVOICE_ROUTE_CONSTANT} from '../../../../../core/constant/invoice/invoice-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {InvoiceService} from '../../../../../core/service/invoice-service';

@Component({
  selector: 'app-invoice-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  invoicePage = signal<ListData<Invoice> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/invoices/create'
  invoiceListRouting = INVOICE_ROUTE_CONSTANT;

  protected readonly INVOICE_COLUMNS: ColumnConfig<Invoice>[] =[
    {key: 'id', title: 'Id', editable: false, type: 'text'},
    {key: 'invoiceNumber', title: 'Number', editable: false, type: "text"},
    {key: 'amount', title: 'Amount', editable: true, type: "text"},
    {key: 'currency', title: 'Currency', editable: true, type: 'select', options: CURRENCYOPTION},
    {key: 'status', title: 'Status', editable: true, type: 'select', options: INVOICESTATUSOPTION},
    {key: 'paidDate', title: 'Paid Date', editable: true, type: 'date-time'},
    {key: 'billingPeriodEnd', title: 'Period End', editable:true, type: "date-time"},
    {key: 'billingPeriodStart', title: 'Period Start', editable: true, type: 'date-time'},
    {key: 'amountUsd', title: 'Amount USD', editable: true, type: "text"},
    {key: 'exchangeRate', title: 'Exchange Rate', editable: true, type: 'text'},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type:'select', options: SOFTDELETEOPTIONS}
  ]

  private invoiceService = inject(InvoiceService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadInvoices(page, size);
    });
  }

  private loadInvoices(page: number, size: number) {
    this.loading.set(true);

    this.invoiceService.getInvoices(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.invoicePage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách invoices');
        this.loading.set(false);
      }
    });
  }

  // Khi đổi trang
  onPageChange(newPage: number) {
    console.log('[PAGE] Changed to:', newPage);
    this.currentPage.set(newPage);
    // Không cần gọi loadFeatures nữa → effect tự chạy
  }

  // Khi đổi size
  onSizeChange(newSize: number) {
    console.log('[SIZE] Changed to:', newSize);
    this.pageSize.set(newSize);
    this.currentPage.set(1); // reset về trang 1
    // Effect tự reload
  }

  onSaveRow(updateInvoice: Invoice) {
    // this.userService.updateUser(updatedUser).subscribe({
    //   next: () => {
    //     this.message.success('Cập nhật thành công');
    //     this.loadUsers();  // ← gọi lại API load toàn bộ list
    //   },
    //   error: () => {
    //     this.message.error('Cập nhật thất bại');
    //     // Optional: rollback cache nếu cần
    //   }
    // });
    console.log('calling api')
  }

  // Bulk delete (tương tự)
  onBulkDelete(ids: number[]) {
    // if (ids.length === 0) return;
    //
    // this.modal.confirm({
    //   nzTitle: 'Xác nhận xóa',
    //   nzContent: `Xóa ${ids.length} feature?`,
    //   nzOkText: 'Xóa',
    //   nzOkDanger: true,
    //   nzOnOk: () => {
    //     this.featureService.bulkDelete(ids).subscribe({
    //       next: () => {
    //         this.message.success('Xóa thành công');
    //         this.currentPage.set(this.currentPage()); // trigger reload
    //       },
    //       error: () => this.message.error('Xóa thất bại')
    //     });
    //   }
    // });
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
