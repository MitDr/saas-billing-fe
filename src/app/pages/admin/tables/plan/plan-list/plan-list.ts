import {Component, signal} from '@angular/core';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Plan} from '../../../../../core/interface/entity/plan';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {FEATURESTATUSOPTIONS} from '../../feature/feature-list/feature-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

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
  plans = signal<Plan[]>(FAKE_PLAN);
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

  onSavePlan(updatedPlan: Plan) {
    // gọi API hoặc update signal
    this.plans.update(list =>
      list.map(u => u.id === updatedPlan.id ? updatedPlan : u)
    );
  }
  onDeletePlan(plan: Plan){
    this.plans.update(u => u.filter(u=> u.id !== plan.id));
  }

  onBulkDelete(ids: number[]){
    this.plans.update(list=> list.filter(u=>!ids.includes(u.id)))
  }
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
