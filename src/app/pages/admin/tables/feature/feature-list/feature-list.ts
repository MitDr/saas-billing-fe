import {Component, inject, signal} from '@angular/core';
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
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './feature-list.html',
  styleUrl: './feature-list.css',
})
export class FeatureList {
  // State phân trang
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  userPageResponse = signal<ListData<Feature> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/users/features'
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
    // Load ban đầu
    this.loadFeatures();
  }

  loadFeatures() {
    this.loading.set(true);
    // API page 1-based, nhưng backend thường 0-based → -1
    this.featureService.getFeature(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.userPageResponse.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.message.error('Không thể tải danh sách user');
        console.error(err);
      }
    });
  }

  // Khi đổi trang
  onPageChange(newPage: number) {
    this.currentPage.set(newPage);
    this.loadFeatures();
  }

  // Khi đổi size
  onSizeChange(newSize: number) {
    this.pageSize.set(newSize);
    this.currentPage.set(1); // reset về trang 1
    this.loadFeatures();
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
