import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Plan} from '../../../../../core/interface/entity/plan';
import {AUTH_PLAN_ROUTE_CONSTANT, PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {PlanService} from '../../../../../core/service/plan-service';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {AuthPlanRequest} from '../../../../../core/interface/request/auth/auth-plan-request';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../../../admin/tables/tenant/tenant-list/tenant-list';
import {PLANSTATUSOPTIONS} from '../../../../admin/tables/plan/plan-list/plan-list';
import {PlanRequest} from '../../../../../core/interface/request/plan-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-plan-list',
  imports: [
    EditableDataTable,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    RouterLink
  ],
  templateUrl: './auth-plan-list.html',
  styleUrl: './auth-plan-list.css',
})
export class AuthPlanList extends AuthGenericListComponent<AuthPlan, AuthPlanRequest>{
  planPage = signal<ListData<AuthPlan> | null>(null);
  checked = false;
  createRoute = '/app/tables/plans/create'
  planListRouting = AUTH_PLAN_ROUTE_CONSTANT;
  private planService = inject(AuthPlanService);

  getDataPage(): Signal<ListData<AuthPlan> | null> {
    return this.planPage;
  }

  override getColumns(): ColumnConfig<AuthPlan>[] {
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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.planService.getPlans(page, size, search).subscribe({
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

  protected mapToUpdatePayload(updatedPlan: AuthPlan): AuthPlanRequest {
    const result: AuthPlanRequest = {
      name: updatedPlan.name,
      image: updatedPlan.image,
      status: updatedPlan.status,
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
