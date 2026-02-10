import {Component, effect, inject, signal} from '@angular/core';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Feature} from '../../../../../core/interface/entity/feature';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FeatureService} from '../../../../../core/service/feature-service';

@Component({
  selector: 'app-feature-list',
  imports: [
    EditableDataTable,
  ],
  templateUrl: './feature-list.html',
  styleUrl: './feature-list.css',
})
export class FeatureList {
  // State phân trang
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  featurePage = signal<ListData<Feature> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/features/create'
  featureListRouting = FEATURE_ROUTE_CONSTANT;

  protected readonly FEATURE_COLUMNS: ColumnConfig<Feature>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title: 'Name', editable: true, type: 'text'},
    {key: 'code', title: 'Code', editable: true, type: 'text'},
    {key: 'description', title: 'Description', 'editable': true, 'type': 'text'},
    {key: 'status', title: 'Status', editable: true, type: 'select', options: FEATURESTATUSOPTIONS},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'entitlements', title: 'Num of Entitlements', editable: false, type: 'custom', path: 'entitlements.length'},
    {key: 'plans', title: 'Num of Plans', editable: false, type: 'custom', path: 'plans.length'},
    {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path: 'tenant.name'},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
  ]

  private featureService = inject(FeatureService);
  private message = inject(NzMessageService);

  // Columns giữ nguyên
  constructor() {
    // Effect tự động load khi currentPage hoặc pageSize thay đổi
    effect(() => {
      // Lấy giá trị để effect phụ thuộc
      const page = this.currentPage();
      const size = this.pageSize();

      // console.log('[EFFECT] Reload features - page:', page, 'size:', size);
      this.loadFeatures(page, size);
    });
  }

  private loadFeatures(page: number, size: number) {
    this.loading.set(true);

    this.featureService.getFeatures(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.featurePage.set(response);
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

  onSaveRow(updateFeature: Feature) {
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

export const FAKE_FEATURES: Feature[] = [
  {
    "id": 3,
    "code": "aaa",
    "name": "API access2",
    "description": "Access to all apis",
    "status": "INACTIVE",
    "createdDate": "05-01-2026 22:09:24",
    "modifiedDate": "05-01-2026 22:13:54",
    "entitlements": 0,
    "plans": 0,
    "tenant": {
      "id": 2,
      "name": "Long3's tenant",
      "email": "ttlong13013@gmail.com",
      "createdDate": "07-10-2025 21:24:12",
      "modifiedDate": "29-12-2025 22:31:59",
      "softDelete": false
    },
    "softDelete": false
  },
  {
    "id": 2,
    "code": "api_v11_11",
    "name": "API access",
    "description": "Access to all apis",
    "status": "ACTIVE",
    "createdDate": "07-10-2025 21:26:04",
    "modifiedDate": "07-10-2025 21:26:04",
    "entitlements": 1,
    "plans": 5,
    "tenant": {
      "id": 2,
      "name": "Long3's tenant",
      "email": "ttlong13013@gmail.com",
      "createdDate": "07-10-2025 21:24:12",
      "modifiedDate": "29-12-2025 22:31:59",
      "softDelete": false
    },
    "softDelete": false
  },
  {
    "id": 1,
    "code": "api_v1_1",
    "name": "API access",
    "description": "Access to all apis",
    "status": "ACTIVE",
    "createdDate": "07-10-2025 21:25:31",
    "modifiedDate": "07-10-2025 21:25:31",
    "entitlements": 2,
    "plans": 5,
    "tenant": {
      "id": 2,
      "name": "Long3's tenant",
      "email": "ttlong13013@gmail.com",
      "createdDate": "07-10-2025 21:24:12",
      "modifiedDate": "29-12-2025 22:31:59",
      "softDelete": false
    },
    "softDelete": false
  }
]
export const FEATURESTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Inactive', value: 'INACTIVE', color: 'red'}
]
