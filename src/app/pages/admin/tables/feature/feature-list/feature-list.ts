import {Component, inject, signal} from '@angular/core';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Feature} from '../../../../../core/interface/entity/feature';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {FeatureService} from '../../../../../core/service/feature-service';
import {FeatureRequest} from '../../../../../core/interface/request/feature-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-feature-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './feature-list.html',
  styleUrl: './feature-list.css',
})
export class FeatureList extends GenericListComponent<Feature, FeatureRequest> {
  featurePage = signal<ListData<Feature> | null>(null);
  checked = false;
  createRoute = '/admin/tables/features/create'
  featureListRouting = FEATURE_ROUTE_CONSTANT
  private featureService = inject(FeatureService);

  getDataPage() {
    return this.featurePage;
  }

  override getColumns(): ColumnConfig<Feature>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: 'text'},
      {key: 'code', title: 'Code', editable: true, type: 'text'},
      {key: 'description', title: 'Description', 'editable': true, 'type': 'text'},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: FEATURESTATUSOPTIONS},
      // {key: 'createdDate', title: 'Created Date', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false},
      {key: 'entitlements', title: 'Num of Entitlements', editable: false, type: 'custom', path: 'entitlements.length'},
      {key: 'plans', title: 'Num of Plans', editable: false, type: 'custom', path: 'plans.length'},
      {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path: 'tenant.name'},
      {key: 'softDelete', title: 'Soft Delete', editable: false, type: 'select', options: SOFTDELETEOPTIONS},

    ];
  }

  getCreateRoute() {
    return this.createRoute;
  }

  getRoutingConstant() {
    return this.featureListRouting;
  }

  getService() {
    return this.featureService;
  }


  mapToUpdatePayload(updatedFeature: Feature): FeatureRequest {
    const result: FeatureRequest = {
      code: updatedFeature.code,
      name: updatedFeature.name,
      status: updatedFeature.status,
      tenantId: updatedFeature.tenant.id
    }

    if (updatedFeature.description) {
      result.description = updatedFeature.description
    }

    return result
  }

  protected loadData(page: number, size: number, search?: string, softDelete?: boolean | null, tenantId?: number | null, sort?: string) {
    this.loading.set(true);
    this.featureService.getFeatures(page, size, search, softDelete, tenantId).subscribe({ // No sort for Price
      next: (response) => {
        // Sync queryParams (nếu cần, copy từ cũ)
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page,
            size: this.pageSize(),
            search: this.search() || null,
            softDelete: this.softDeleteFilter(),
            tenantId: this.tenantFilter()
          },
          queryParamsHandling: 'merge'
        });
        this.featurePage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách prices');
        this.loading.set(false);
      }
    });
  }
}

export const FEATURESTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Inactive', value: 'INACTIVE', color: 'red'}
]
