import {Component, inject, Signal, signal} from '@angular/core';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthPlanGroupRequest} from '../../../../../core/interface/request/auth/auth-plan-group-request';
import {ListData} from '../../../../../core/interface/list-data';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {
  AUTH_PLAN_GROUP_ROUTE_CONSTANT,
  PLAN_GROUP_ROUTE_CONSTANT
} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-plan-group-list',
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
  templateUrl: './auth-plan-group-list.html',
  styleUrl: './auth-plan-group-list.css',
})
export class AuthPlanGroupList extends AuthGenericListComponent<AuthPlanGroup, AuthPlanGroupRequest> {
  planGroupPage = signal<ListData<AuthPlanGroup> | null>(null);
  checked = false;
  createRoute = '/app/tables/plan-groups/create'
  planGroupListRouting = AUTH_PLAN_GROUP_ROUTE_CONSTANT;
  private planGroupService = inject(AuthPlanGroupService);

  getDataPage(): Signal<ListData<AuthPlanGroup> | null> {
    return this.planGroupPage;
  }

  override getColumns(): ColumnConfig<AuthPlanGroup>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: 'text'},
      {key: 'description', title: 'Description', editable: true, type: 'text'},
      // {key: 'createdDate', title: 'Created Date', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false},
      {key: 'plans', title: 'Num of Plan', editable: false, type: "custom", path: 'plans.length'},

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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.planGroupService.getPlanGroups(page, size, search).subscribe({
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

  protected mapToUpdatePayload(updateFeature: AuthPlanGroup): AuthPlanGroupRequest {
    const result: AuthPlanGroupRequest = {
      name: updateFeature.name,
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
