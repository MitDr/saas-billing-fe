import {Component, effect, inject, signal} from '@angular/core';
import {Plan} from '../../../../../core/interface/entity/plan';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {FAKE_PLAN, PLANSTATUSOPTIONS} from '../../plan/plan-list/plan-list';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {PLAN_GROUP_ROUTE_CONSTANT} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';

@Component({
  selector: 'app-plan-group-list',
  imports: [
    NzButtonComponent,
    RouterLink,
    EditableDataTable
  ],
  templateUrl: './plan-group-list.html',
  styleUrl: './plan-group-list.css',
})
export class PlanGroupList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  planGroupPage = signal<ListData<PlanGroup> | null>(null);
  loading = signal(false);


  // planGroups = signal<PlanGroup[]>(FAKE_PLAN_GROUP);
  checked = false;
  createRoute = '/admin/tables/plan-groups/create'
  planGroupListRouting = PLAN_GROUP_ROUTE_CONSTANT;

  protected readonly PLAN_GROUP_COLUMNS: ColumnConfig<PlanGroup>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title:'Name', editable: true, type: 'text'},
    {key: 'description', title: 'Description', editable: true, type: 'text'},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'plans', title: 'Num of Plan', editable: false, type: "custom", path: 'plans.length'},
    {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path:'tenant.name'},
  ]

  private planGroupService = inject(PlanGroupService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadPlanGroups(page, size);
    });
  }

  private loadPlanGroups(page: number, size: number) {
    this.loading.set(true);

    this.planGroupService.getPlanGroups(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.planGroupPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách plan groups');
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

  onSaveRow(updateFeature: PlanGroup) {
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

export const FAKE_PLAN_GROUP: PlanGroup[] = [
  {
    "id": 1,
    "name": "api_groups",
    "description": "This is the group for apis",
    "createdDate": "07-01-2026 17:46:46",
    "modifiedDate": "07-01-2026 17:46:46",
    "plans": [
      {
        "id": 2,
        "name": "Premium",
        "image": "aaaaaabfgf",
        "status": "ACTIVE",
        "createdDate": "07-01-2026 17:42:11",
        "modifiedDate": "07-01-2026 17:46:46",
        "softDelete": false
      }
    ],
    "tenant": {
      "id": 1,
      "name": "Long1's tenant",
      "email": "ttlong13011@gmail.com",
      "createdDate": "07-10-2025 21:17:33",
      "modifiedDate": "07-10-2025 21:17:36",
      "softDelete": false
    }
  }
]
