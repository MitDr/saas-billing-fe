import {Component, effect, inject, signal} from '@angular/core';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Plan} from '../../../../../core/interface/entity/plan';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PlanService} from '../../../../../core/service/plan-service';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';

@Component({
  selector: 'app-plan-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './plan-list.html',
  styleUrl: './plan-list.css',
})
export class PlanList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  planPage = signal<ListData<Plan> | null>(null);
  loading = signal(false);
  // plans = signal<Plan[]>(FAKE_PLAN);
  checked = false;
  createRoute = '/admin/tables/plans/create'
  planListRouting = PLAN_ROUTE_CONSTANT;

  protected readonly PLAN_COLUMNS: ColumnConfig<Plan>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title:'Name', editable: true, type: 'text'},
    {key: 'image', title: 'image', editable: false, type: 'avatar'},
    {key: 'status', title: 'Status', editable: true, type: 'select', options: PLANSTATUSOPTIONS},
    {key: 'planGroup', title: 'num of planGroup', editable: false},
    {key: 'prices', title: 'num of price', editable: false},
    {key: 'features', title: 'num of feature', editable: false, type: 'custom', path: 'features.length'},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path:'tenant.name'},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
  ]
  private planService = inject(PlanService);
  private message = inject(NzMessageService);

  constructor() {
    // Effect tự động load khi currentPage hoặc pageSize thay đổi
    effect(() => {
      // Lấy giá trị để effect phụ thuộc
      const page = this.currentPage();
      const size = this.pageSize();

      // console.log('[EFFECT] Reload features - page:', page, 'size:', size);
      this.loadPlans(page, size);
    });
  }

  loadPlans(page: number, size: number){
    this.loading.set(true);

    this.planService.getPlans(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.planPage.set(response);
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

  onSaveRow(updatedPlan: Plan) {
    // gọi API hoặc update signal
    // this.plans.update(list =>
    //   list.map(u => u.id === updatedPlan.id ? updatedPlan : u)
    // );
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

export const FAKE_PLAN: Plan[] = [
  {
    "id": 1,
    "name": "Api",
    "image": "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    "status": "ACTIVE",
    "createdDate": "07-10-2025 21:25:09",
    "modifiedDate": "07-10-2025 21:25:09",
    "planGroup": 0,
    "prices": 2,
    "features": [
      {
        "id": 1,
        "code": "api_v1_1",
        "name": "API access",
        "description": "Access to all apis",
        "status": "ACTIVE",
        "createdDate": "07-10-2025 21:25:31",
        "modifiedDate": "07-10-2025 21:25:31",
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
        "softDelete": false
      }
    ],
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
    "name": "Api",
    "image": '',
    "status": "ACTIVE",
    "createdDate": "07-10-2025 21:25:09",
    "modifiedDate": "07-10-2025 21:25:09",
    "planGroup": 0,
    "prices": 2,
    "features": [
      {
        "id": 1,
        "code": "api_v1_1",
        "name": "API access",
        "description": "Access to all apis",
        "status": "ACTIVE",
        "createdDate": "07-10-2025 21:25:31",
        "modifiedDate": "07-10-2025 21:25:31",
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
        "softDelete": false
      }
    ],
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
]

export const PLANSTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Inactive', value: 'INACTIVE', color: 'red'}
]
