import {Component, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {EntitlementRequest} from '../../../../../core/interface/request/entitlement-request';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {ENTITLEMENT_ROUTE_CONSTANT} from '../../../../../core/constant/entitlement/entitlement-list-constant';
import {EntitlementService} from '../../../../../core/service/entitlement-service';

@Component({
  selector: 'app-entitlement-list',
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
  templateUrl: './entitlement-list.html',
  styleUrl: './entitlement-list.css',
})
export class EntitlementList extends GenericListComponent<Entitlement, EntitlementRequest> {
  entitlementPage = signal<ListData<Entitlement> | null>(null);
  checked = false;
  createRoute = '/admin/tables/entitlements/create'
  entitlementListRouting = ENTITLEMENT_ROUTE_CONSTANT;
  private entitlementService = inject(EntitlementService);

  getDataPage() {
    return this.entitlementPage;
  }

  getColumns(): ColumnConfig<Entitlement>[] {
    return [
      {key: "id", title: 'Id', editable: false},
      {key: 'startDate', title: 'Start Date', editable: true, type: 'date-time'},
      {key: 'endDate', title: 'End Date', editable: true, type: 'date-time'},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: ENTITLEMENTSTATUSOPTION},
      // {key: 'createdDate', title: 'Created Date', editable: false, type: 'text'},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false, type: 'text'},
      {key: 'subscription', title: 'Subscriptions\'s Id', editable: false, type: "custom", path: 'subscription.id'},
      {key: 'feature', title: 'Feature\'s Id', editable: false, type: 'custom', path: 'feature.id'},
      {key: 'subscriber', title: 'Subscriber\'s Name', editable: false, type: 'custom', path: 'subscriber.name'},
      {key: 'tenant', title: 'Tenant\'s Name', editable: false, type: 'custom', path: 'tenant.name'},
      {key: 'softDelete', title: 'Soft Delete', editable: false, type: "select", options: SOFTDELETEOPTIONS}
    ]
  }

  getCreateRoute() {
    return this.createRoute;
  }

  getRoutingConstant() {
    return this.entitlementListRouting;
  }

  getService() {
    return this.entitlementService;
  }

  onSearchChange(value: string) {
    this.search.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
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


  protected loadData(page: number, size: number, search?: string, softDelete?: boolean | null, tenantId?: number | null, sort?: string) {
    this.loading.set(true);
    this.entitlementService.getEntitlements(page, size, search, softDelete, tenantId).subscribe({ // No sort for Price
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
        this.entitlementPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách prices');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(entitlement: Entitlement): EntitlementRequest {
    return {
      startDate: entitlement.startDate,
      endDate: entitlement.endDate,
      status: entitlement.status,
      subscriptionId: entitlement.subscription.id,
      featureId: entitlement.feature.id,
      tenantId: entitlement.tenant.id,
      // softDelete: entitlement.softDelete
      // password: nếu có field password trong form edit, thêm vào đây
      // password: user.password || undefined
    };
  }
}

export const ENTITLEMENTSTATUSOPTION = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Expired', value: 'EXPIRED', color: 'red'},
  {label: 'Revoked', value: 'REVOKED', color: 'orange'}
]
