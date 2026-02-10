import {Component, effect, inject, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {TENANT_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-list-constant';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {USER_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-list-constant';
import {ListData} from '../../../../../core/interface/list-data';
import {User} from '../../../../../core/interface/entity/user';
import {TenantService} from '../../../../../core/service/tenant-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';

@Component({
  selector: 'app-tenant-list',
  imports: [
    NzButtonComponent,
    RouterLink,
    EditableDataTable
  ],
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.css',
})
export class TenantList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  tenantPageResponse = signal<ListData<Tenant> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/tenants/create'
  tenantListRouting = TENANT_ROUTE_CONSTANT;
  protected readonly TENANT_COLUMNS: ColumnConfig<Tenant>[]= [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title: 'Name', editable: true, type: 'text'},
    {key: 'email', title: 'Email', editable: true, type: 'text'},
    {key: 'currentAmount', title: 'Current Amount', editable: false, type: 'text'},
    {key: 'pendingAmount', title: 'Pending Amount', editable: false, type: 'text'},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
    {key: 'creator', title: 'Creator', editable: false, type: 'custom', path: 'creator.username'},
    {key: 'users', title: 'Num of User', editable: false, type:'custom', path: 'users.length'}
  ];

  private tenantService = inject(TenantService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadTenants(page, size);
    });
  }

  private loadTenants(page: number, size: number) {
      this.loading.set(true);

      this.tenantService.getTenants(page, size).subscribe({  // page 0-based cho backend
        next: (response) => {
          // console.log('[API] Features loaded:', response);
          this.tenantPageResponse.set(response);
          this.loading.set(false);
        },
        error: (err) => {
          // console.error('[API] Load features error:', err);
          this.message.error('Không thể tải danh sách tenants');
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

  onSaveRow(updatedTenant: Tenant) {
  //   // gọi API hoặc update signal
  //   this.tenants.update(list =>
  //     list.map(u => u.id === updatedTenant.id ? updatedTenant : u)
  //   );
  // }
  //
  // onDeleteTenant(tenant: Tenant){
  //   this.tenants.update(list => list.filter(u=> u.id !== tenant.id));
  // }
  //
  // onBulkDelete(ids: number[]){
  //   this.tenants.update(list=> list.filter(u=>!ids.includes(u.id)))
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

  protected readonly featureListRouting = FEATURE_ROUTE_CONSTANT;
}

export const FAKE_TENANTS: Tenant[] = [
  {
    "id": 2,
    "name": "Long3's tenant",
    "email": "long3@gmail.com",
    "apiKey": "sk_kNSGegEeecXFE9Isa_ICBG",
    "currentAmount": 6771,
    "pendingAmount": 68246,
    "stripeAccountId": "acct_1SF",
    "createdDate": "07-10-2025 21:24:12",
    "modifiedDate": "08-01-2026 20:52:07",
    "creator": {
      "id": 4,
      "username": "Lonnng3",
      "email": "long3@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:43",
      "modifiedDate": "07-10-2025 21:24:15"
    },
    "users": [
      {
        "id": 4,
        "username": "Lonnng3",
        "email": "long3@gmail.com",
        "role": "USER",
        "createdDate": "07-10-2025 21:16:43",
        "modifiedDate": "07-10-2025 21:24:15"
      },
      {
        "id": 5,
        "username": "Lonnng4",
        "email": "long4@gmail.com",
        "role": "USER",
        "createdDate": "07-10-2025 21:16:47",
        "modifiedDate": "07-10-2025 21:24:24"
      }
    ],
    "softDelete": false
  },
  {
    "id": 1,
    "name": "Long1's tenant",
    "email": "long1@gmail.com",
    "apiKey": "sk_sqQOASCnfl5P9rDyi7mLnMHwN",
    "currentAmount": 0,
    "pendingAmount": 0,
    "stripeAccountId": "acct_1SF",
    "createdDate": "07-10-2025 21:17:33",
    "modifiedDate": "07-10-2025 21:17:36",
    "creator": {
      "id": 2,
      "username": "Lonnng1",
      "email": "long1@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:36",
      "modifiedDate": "07-10-2025 21:17:36"
    },
    "users": [
      {
        "id": 2,
        "username": "Lonnng1",
        "email": "long1@gmail.com",
        "role": "USER",
        "createdDate": "07-10-2025 21:16:36",
        "modifiedDate": "07-10-2025 21:17:36"
      },
      {
        "id": 3,
        "username": "Lonnng2",
        "email": "long2@gmail.com",
        "role": "USER",
        "createdDate": "07-10-2025 21:16:40",
        "modifiedDate": "07-10-2025 21:22:15"
      }
    ],
    "softDelete": false
  }
]

export const SOFTDELETEOPTIONS = [
  {label: 'True', value: true, color: 'blue'},
  {label: 'False', value: false, color: 'green'}
];
