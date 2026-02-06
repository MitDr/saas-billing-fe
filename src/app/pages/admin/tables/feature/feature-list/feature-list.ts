import {Component, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {FAKE_TENANTS, SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {TENANT_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-list-constant';
import {Feature} from '../../../../../core/interface/entity/feature';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

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
  features = signal<Feature[]>(FAKE_FEATURES);
  checked = false;
  createRoute = '/admin/tables/features/create'
  featureListRouting = FEATURE_ROUTE_CONSTANT;

  protected readonly FEATURE_COLUMNS: ColumnConfig<Feature>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title:'Name', editable: true, type: 'text'},
    {key: 'code', title: 'Code', editable: true, type: 'text'},
    {key: 'description', title: 'Description', 'editable': true, 'type': 'text'},
    {key: 'status', title: 'Status', editable: true, type: 'select', options: FEATURESTATUSOPTIONS},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'entitlements', title: 'Num of Entitlements', editable: false},
    {key: 'plans', title: 'Num of Plans', editable: false},
    {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path:'tenant.name'},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
  ]

  onSaveFeature(updatedFeature: Feature) {
    // gọi API hoặc update signal
    this.features.update(list =>
      list.map(u => u.id === updatedFeature.id ? updatedFeature : u)
    );
  }
  onDeleteFeature(feature: Feature){
    this.features.update(u => u.filter(u=> u.id !== feature.id));
  }

  onBulkDelete(ids: number[]){
    this.features.update(list=> list.filter(u=>!ids.includes(u.id)))
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
export  const FEATURESTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Inactive', value: 'INACTIVE', color: 'red'}
]
