import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Payment} from '../../../../../core/interface/entity/payment';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {PAYMENT_ROUTE_CONSTANT} from '../../../../../core/constant/payment/payment-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {PaymentService} from '../../../../../core/service/payment-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-payment-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  paymentPage = signal<ListData<Payment> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/payments/create'
  paymentListRouting = PAYMENT_ROUTE_CONSTANT;

  protected readonly PAYMENT_COLUMNS: ColumnConfig<Payment>[] = [
    {key: 'id', title: 'Id', type:'text', editable: false},
    {key: 'amount', title: 'Amount', type: "text", editable: true},
    {key: 'status', title: 'Status', type: 'select', editable: true, options: PAYMENTSTATUSOPTION},
    {key: 'paymentIntentId', title: 'Intent Id', type: "text", editable: true},
    {key: 'chargeId', title: 'Charge Id', type: 'text', editable: true},
    {key: 'balanceTransactionId', title: 'B.Transaction Id', type: 'text', editable: true},
    {key: 'paymentMethod', title: 'Payment Method', type: "text", editable: true},
    {key: 'invoice', title: 'Invoice Number', type: 'custom', path: 'invoice.invoiceNumber', editable: false},
    {key: 'availableOn', title: 'Available On', type: 'text', editable: true},
    {key: 'softDelete', title: 'Soft Delete', type: 'select', editable: true, options: SOFTDELETEOPTIONS}
  ]

  private paymentService = inject(PaymentService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();

      this.loadPayments(page, size);
    });
  }

  private loadPayments(page: number, size: number) {
    this.loading.set(true);

    this.paymentService.getPayments(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.paymentPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách payments');
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

  onSaveRow(updatePayment: Payment) {
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

export const PAYMENTSTATUSOPTION = [
  {label: 'Pending', value: 'PENDING', color: 'blue'},
  {label: 'Available', value: 'AVAILABLE', color: 'green'},
  {label: 'Refunded', value: 'REFUNDED', color: 'red'}
];
