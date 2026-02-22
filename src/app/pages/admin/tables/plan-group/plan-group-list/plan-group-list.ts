import {Component, inject, Signal, signal} from '@angular/core';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {PLAN_GROUP_ROUTE_CONSTANT} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {ListData} from '../../../../../core/interface/list-data';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan-group-list',
  imports: [
    NzButtonComponent,
    RouterLink,
    EditableDataTable,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './plan-group-list.html',
  styleUrl: './plan-group-list.css',
})
export class PlanGroupList extends GenericListComponent<PlanGroup, PlanGroupRequest> {
  planGroupPage = signal<ListData<PlanGroup> | null>(null);
  checked = false;
  createRoute = '/admin/tables/plan-groups/create'
  planGroupListRouting = PLAN_GROUP_ROUTE_CONSTANT;
  private planGroupService = inject(PlanGroupService);

  getDataPage(): Signal<ListData<PlanGroup> | null> {
    return this.planGroupPage;
  }

  override getColumns(): ColumnConfig<PlanGroup>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: 'text'},
      {key: 'description', title: 'Description', editable: true, type: 'text'},
      // {key: 'createdDate', title: 'Created Date', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false},
      {key: 'plans', title: 'Num of Plan', editable: false, type: "custom", path: 'plans.length'},
      {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path: 'tenant.name'},

    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.planGroupListRouting;
  }

  getService() {
    return this.planGroupService;
  }

  onSearchChange(value: string) {
    if (value !== this.search()) {
      this.searchSubject.next(value);
    }
  }

  onTenantChange(value: number | null) {
    this.tenantFilter.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  protected loadData(
    page: number,
    size: number,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort?: string
  ): void {
    this.loading.set(true);
    this.planGroupService.getPlanGroups(page, size, search, tenantId).subscribe({
      next: (response) => {
        this.planGroupPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách plan-groups');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updateFeature: PlanGroup): PlanGroupRequest {
    const result: PlanGroupRequest = {
      name: updateFeature.name,
      tenantId: updateFeature.tenant.id
    }
    if (updateFeature.description) {
      result.description = updateFeature.description
    }
    if (updateFeature.plans.length > 0) {
      result.plans = updateFeature.plans.map(plan => plan.id)
    }
    return result;
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
