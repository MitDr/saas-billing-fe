import {Component, inject, Signal, signal} from '@angular/core';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Plan} from '../../../../../core/interface/entity/plan';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {PlanService} from '../../../../../core/service/plan-service';
import {PlanRequest} from '../../../../../core/interface/request/plan-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './plan-list.html',
  styleUrl: './plan-list.css',
})
export class PlanList extends GenericListComponent<Plan, PlanRequest> {
  planPage = signal<ListData<Plan> | null>(null);
  checked = false;
  createRoute = '/admin/tables/plans/create'
  planListRouting = PLAN_ROUTE_CONSTANT;
  private planService = inject(PlanService);

  getDataPage(): Signal<ListData<Plan> | null> {
    return this.planPage;
  }

  override getColumns(): ColumnConfig<Plan>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: 'text'},
      {key: 'image', title: 'image', editable: false, type: 'avatar'},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: PLANSTATUSOPTIONS},
      {key: 'planGroup', title: 'planGroup\'s name', editable: false, type: 'custom', path: 'planGroup.name'},
      {key: 'prices', title: 'num of price', editable: false, type: 'custom', path: 'prices.length'},
      {key: 'features', title: 'num of feature', editable: false, type: 'custom', path: 'features.length'},
      // {key: 'createdDate', title: 'Created Date', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false},
      {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path: 'tenant.name'},
      {key: 'softDelete', title: 'Soft Delete', editable: false, type: 'select', options: SOFTDELETEOPTIONS},

    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.planListRouting;
  }

  getService() {
    return this.planService;
  }

  onSearchChange(value: string) {
    if (value !== this.search()) {
      this.searchSubject.next(value);
    }
  }

  onSoftDeleteChange(value: boolean | null) {
    this.softDeleteFilter.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
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
    this.planService.getPlans(page, size, search, softDelete, tenantId).subscribe({
      next: (response) => {
        this.planPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách plans');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updatedPlan: Plan): PlanRequest {
    const result: PlanRequest = {
      name: updatedPlan.name,
      image: updatedPlan.image,
      status: updatedPlan.status,
      tenantId: updatedPlan.tenant.id
    }
    if (updatedPlan.prices.length > 0) {
      result.prices = updatedPlan.prices.map(price => price.id);
    }
    if (updatedPlan.features.length > 0) {
      result.features = updatedPlan.features.map(feature => feature.id);
    }

    return result;
  }
}

export const PLANSTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Deactivated', value: 'DEACTIVATED', color: 'gray'},
  {label: 'Cancel', value: 'CANCEL', color: 'red'}
]
