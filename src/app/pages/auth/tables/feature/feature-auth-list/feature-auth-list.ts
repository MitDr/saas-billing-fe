import {Component, inject, signal} from '@angular/core';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthFeatureRequest} from '../../../../../core/interface/request/auth/auth-feature-request';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {
  FEATURE_AUTH_ROUTE_CONSTANT,
  FEATURE_ROUTE_CONSTANT
} from '../../../../../core/constant/feature/feature-list-constant';
import {FeatureService} from '../../../../../core/service/feature-service';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../../../admin/tables/tenant/tenant-list/tenant-list';
import {FEATURESTATUSOPTIONS} from '../../../../admin/tables/feature/feature-list/feature-list';
import {FeatureRequest} from '../../../../../core/interface/request/feature-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-feature-auth-list',
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
  templateUrl: './feature-auth-list.html',
  styleUrl: './feature-auth-list.css',
})
export class FeatureAuthList extends AuthGenericListComponent<AuthFeature, AuthFeatureRequest>{
  featurePage = signal<ListData<AuthFeature> | null>(null);
  checked = false;
  createRoute = '/app/tables/features/create'
  featureListRouting = FEATURE_AUTH_ROUTE_CONSTANT
  private featureService = inject(AuthFeatureService);

  getDataPage() {
    return this.featurePage;
  }

  override getColumns(): ColumnConfig<AuthFeature>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: 'text'},
      {key: 'code', title: 'Code', editable: true, type: 'text'},
      {key: 'description', title: 'Description', 'editable': true, 'type': 'text'},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: FEATURESTATUSOPTIONS},
      {key: 'entitlements', title: 'Num of Entitlements', editable: false, type: 'custom', path: 'entitlements.length'},
      {key: 'plans', title: 'Num of Plans', editable: false, type: 'custom', path: 'plans.length'},
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

  mapToUpdatePayload(updatedFeature: AuthFeature): AuthFeatureRequest {
    const result: AuthFeatureRequest = {
      code: updatedFeature.code,
      name: updatedFeature.name,
      status: updatedFeature.status,
    }

    if (updatedFeature.description) {
      result.description = updatedFeature.description
    }

    return result
  }

  protected loadData(page: number, size: number, search?: string, sort?: string) {
    this.loading.set(true);
    this.featureService.getFeatures(page, size, search).subscribe({ // No sort for Price
      next: (response) => {
        // Sync queryParams (nếu cần, copy từ cũ)
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page,
            size: this.pageSize(),
            search: this.search() || null,
          },
          queryParamsHandling: 'merge'
        });
        this.featurePage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách features');
        this.loading.set(false);
      }
    });
  }
}
