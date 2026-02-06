import {Component, signal} from '@angular/core';
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

@Component({
  selector: 'app-plan-group-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './plan-group-list.html',
  styleUrl: './plan-group-list.css',
})
export class PlanGroupList {
  planGroups = signal<PlanGroup[]>(FAKE_PLAN_GROUP);
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

  onSavePlanGroup(updatedPlanGroup: PlanGroup) {
    // gọi API hoặc update signal
    this.planGroups.update(list =>
      list.map(u => u.id === updatedPlanGroup.id ? updatedPlanGroup : u)
    );
  }
  onDeletePlanGroup(feature: PlanGroup){
    this.planGroups.update(u => u.filter(u=> u.id !== feature.id));
  }

  onBulkDelete(ids: number[]){
    this.planGroups.update(list=> list.filter(u=>!ids.includes(u.id)))
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
