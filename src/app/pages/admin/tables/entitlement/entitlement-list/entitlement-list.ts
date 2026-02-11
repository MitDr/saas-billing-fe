import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {ENTITLEMENT_ROUTE_CONSTANT} from '../../../../../core/constant/entitlement/entitlement-list-constant';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EntitlementService} from '../../../../../core/service/entitlement-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-entitlement-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './entitlement-list.html',
  styleUrl: './entitlement-list.css',
})
export class EntitlementList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  entitlementPage = signal<ListData<Entitlement> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/features/create'
  entitlementListRouting = ENTITLEMENT_ROUTE_CONSTANT;

  protected readonly ENTITLEMENT_COLUMNS: ColumnConfig<Entitlement>[] = [
    {key: "id", title: 'Id', editable: false},
    {key: 'startDate', title: 'Start Date', editable: true, type: 'date-time'},
    {key: 'endDate', title: 'End Date', editable: true, type: 'date-time'},
    {key: 'status', title: 'Status', editable: true, type: 'select', options: ENTITLEMENTSTATUSOPTION},
    {key: 'createdDate', title: 'Created Date', editable: false, type: 'text'},
    {key: 'modifiedDate', title: 'Modified Date', editable: false, type: 'text'},
    {key: 'subscription', title: 'Subscriptions\'s Id', editable: false, type: "custom", path: 'subscription.id'},
    {key: 'feature', title: 'Feature\'s Id', editable: false, type: 'custom', path: 'feature.id'},
    {key: 'subscriber', title: 'Subscriber\'s Name', editable: false, type: 'custom', path: 'subscriber.name'},
    {key: 'tenant', title: 'Tenant\'s Name', editable: false, type: 'custom', path: 'tenant.name'},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type: "select", options: SOFTDELETEOPTIONS}
  ]

  private entitlementService = inject(EntitlementService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();

      this.loadEntitlements(page, size);
    });
  }

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

  onSaveRow(updateEntitlement: Entitlement) {
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

  private loadEntitlements(page: number, size: number) {
    this.loading.set(true);

    this.entitlementService.getEntitlements(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        this.entitlementPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.message.error('Không thể tải danh sách entitlements');
        this.loading.set(false);
      }
    });
  }
}

export const ENTITLEMENTSTATUSOPTION = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Expire', value: 'EXPIRE', color: 'red'},
  {label: 'Revoked', value: 'REVOKED', color: 'orange'}
]
