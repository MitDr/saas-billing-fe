import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {SUBSCRIPTION_ROUTE_CONSTANT} from '../../../../../core/constant/subscription/subscription-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Subscription} from '../../../../../core/interface/entity/subscription';

@Component({
  selector: 'app-subscription-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css',
})
export class SubscriptionList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  // @ts-ignore
  subscriptionPage = signal<ListData<Subscription> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/subscriptions/create'
  subscriptionListRouting = SUBSCRIPTION_ROUTE_CONSTANT;

  protected readonly SUBSCRIPTION_COLUMNS: ColumnConfig<Subscription>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'status', title: 'Status', editable: true, type:'select', options: SUBSCRIPTONSTATUSOPTIONS},
    {key: 'defaultPaymentMethod',title: 'Default Payment Method', editable: true},
    {key: 'quantity', title: 'Quantity', editable: true},
    {key: 'startDate', title: 'Start Date', editable: true, type: 'date-time'},
    {key: 'endDate', title: 'End Date', editable: true, type: 'date-time'},
    {key: 'cancelDate', title: 'Cancel date', editable: true, type: 'date-time'},
    {key: 'cancelAtPeriodEnd', title: 'Cancel At End', type:'select', options: SUBSCRIPTIONCANCELATENDOPTION, editable: true},
    {key: 'dueDate', title: 'Due Date', editable: true, type: 'date-time'},
    {key: 'trial', title: 'Trial', editable: true, type: 'select', options: TRIALOPTION},
    {key: 'softDelete', title: 'Soft Delete', editable: false, type: 'select', options: SOFTDELETEOPTIONS}
  ]

  private subscriptionService = inject(SubscriptionService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();

      this.loadSubscriptions(page, size);
    });
  }

  private loadSubscriptions(page: number, size: number) {
    this.loading.set(true);

    this.subscriptionService.getSubscriptions(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.subscriptionPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách features');
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

  onSaveRow(updateSubscription: Subscription) {
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
//
export const SUBSCRIPTONSTATUSOPTIONS  = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Draft', value: 'DRAFT', color: 'red'},
  {label: 'Pending', value: 'PENDING', color: 'blue'},
  {label: 'Ended', value: 'ENDED', color: 'yellow'},
  {label: 'Cancel', value: 'CANCEL', color: 'orange'}
]
export const SUBSCRIPTIONCANCELATENDOPTION  = [
  {label: 'True', value: true, color: 'green'},
  {label: 'False', value: false, color: 'red'},
]
export const TRIALOPTION  = [
  {label: 'True', value: true, color: 'green'},
  {label: 'False', value: false, color: 'red'},
]
