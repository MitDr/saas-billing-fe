import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Payout} from '../../../../../core/interface/entity/payout';
import {PAYOUT_ROUTE_CONSTANT} from '../../../../../core/constant/payout/payout-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {CURRENCYOPTIONS} from '../../price/price-list/price-list';
import {PayoutService} from '../../../../../core/service/payout-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-payout-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './payout-list.html',
  styleUrl: './payout-list.css',
})
export class PayoutList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  payoutPage = signal<ListData<Payout> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/payouts/create'
  payoutListRouting = PAYOUT_ROUTE_CONSTANT;

  protected readonly PAYOUT_COLUMNS: ColumnConfig<Payout>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'amount', title: 'Amount', editable: true, type: "text"},
    {key: 'currency', title: 'Currency', type:'select', editable: true, options: CURRENCYOPTIONS},
    {key: 'stripeTransferId', title: 'TransferId', editable: true, type: "text"},
    {key: 'stripePayoutId', title: 'PayoutId', editable: true, type: 'text'},
    {key: 'stripeBalanceTransactionId', title: 'B.Transaction Id', editable: true, type: "text"},
    {key: 'tenant', title: 'Tenant\'s Name', editable: false, type: 'custom', path: 'tenant.name'}
  ]

  private payoutService = inject(PayoutService)
  private message = inject(NzMessageService)


  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadPayouts(page, size);
    });
  }

  private loadPayouts(page: number, size: number) {
    this.loading.set(true);

    this.payoutService.getPayouts(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.payoutPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách payout');
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

  onSaveRow(updatePayout: Payout) {
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
