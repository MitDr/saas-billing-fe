import {Component, effect, inject, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {TENANT_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-list-constant';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {ListData} from '../../../../../core/interface/list-data';
import {TenantService} from '../../../../../core/service/tenant-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TenantRequest} from '../../../../../core/interface/request/tenant-request';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-tenant-list',
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
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.css',
})
export class TenantList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  tenantPageResponse = signal<ListData<Tenant> | null>(null);
  loading = signal(false);
  search = signal<string>('');
  softDeleteFilter = signal<boolean | null>(null);


  checked = false;
  createRoute = '/admin/tables/tenants/create'
  tenantListRouting = TENANT_ROUTE_CONSTANT;
  router = inject(Router);
  route = inject(ActivatedRoute);
  protected readonly TENANT_COLUMNS: ColumnConfig<Tenant>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title: 'Name', editable: true, type: 'text'},
    {key: 'email', title: 'Email', editable: true, type: 'text'},
    {key: 'currentAmount', title: 'Current Amount', editable: true, type: 'text'},
    {key: 'pendingAmount', title: 'Pending Amount', editable: true, type: 'text'},
    // {key: 'createdDate', title: 'Created Date', editable: false},
    // {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'creator', title: 'Creator', editable: false, type: 'custom', path: 'creator.username'},
    {key: 'users', title: 'Num of User', editable: false, type: 'custom', path: 'users.length'},
    {key: 'softDelete', title: 'Soft Delete', editable: false, type: 'select', options: SOFTDELETEOPTIONS}

  ];
  private tenantService = inject(TenantService);
  private message = inject(NzMessageService);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;
      const size = Number(params['size']) || 5;
      const search = params['search'] || '';
      const softDelete = params['softDelete'] || null;
      const tenantId = params['tenantId'] || null;

      this.currentPage.set(page);
      this.pageSize.set(size);
      this.search.set(search);
      this.softDeleteFilter.set(softDelete);
    });

    effect(() => {
      this.loadTenants(
        this.currentPage(),
        this.pageSize(),
        this.search(),
        this.softDeleteFilter()
      );
    });
  }

  resetFilters() {
    this.search.set('');
    this.softDeleteFilter.set(null);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: newPage,
        size: this.pageSize(),
        search: this.search(),
        softDelete: this.softDeleteFilter(),
      },
      queryParamsHandling: 'merge'
    });
  }

  // Khi đổi size
  onSizeChange(newSize: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        size: newSize,
        search: this.search(),
        softDelete: this.softDeleteFilter(),
      },
      queryParamsHandling: 'merge'
    });
  }

  onSaveRow(updatedTenant: Tenant) {
    this.tenantService.updateTenant(this.mapToUpdatePayload(updatedTenant), updatedTenant.id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.loadTenants(
          this.currentPage(),
          this.pageSize(),
          this.search(),
          this.softDeleteFilter()
        );
      },
      error: () => {
        this.message.error('Update failed');
        this.loadTenants(
          this.currentPage(),
          this.pageSize(),
          this.search(),
          this.softDeleteFilter()
        );
      }
    });
  }

  onBulkDelete(ids: number[]) {
    if (ids.length === 0) return;
    console.log(ids)
    this.tenantService.bulkDelete(ids).subscribe({
      next: () => {
        this.loadTenants(
          this.currentPage(),
          this.pageSize(),
          this.search(),
          this.softDeleteFilter()
        );
      },
      error: () => this.message.error('Delete Failed')
    });
  }

  onBulkSoftDelete(ids: number[]) {
    if (ids.length === 0) return;
    this.tenantService.bulkSoftDelete({ids: ids, softDelete: true}).subscribe({
      next: () => {
        this.loadTenants(
          this.currentPage(),
          this.pageSize(),
          this.search(),
          this.softDeleteFilter()
        );
      },
      error: () => this.message.error('Soft Delete Failed')
    })
  }

  private loadTenants(
    page: number,
    size: number,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
  ) {
    this.loading.set(true);

    this.tenantService.getTenants(
      page,
      size,
      search,
      softDelete,
    ).subscribe({
      next: (response) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: page,
            size: this.pageSize(),
            search: this.search() || null,
            softDelete: this.softDeleteFilter(),
          },
          queryParamsHandling: 'merge'
        });
        this.tenantPageResponse.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách tenants');
        this.loading.set(false);
      }
    });
  }

  private mapToUpdatePayload(updatedTenant: Tenant): TenantRequest {
    const result: TenantRequest = {
      name: updatedTenant.name,
      email: updatedTenant.email,
      currentAmount: updatedTenant.currentAmount,
      pendingAmount: updatedTenant.pendingAmount,
      creatorId: updatedTenant.creator.id,
    }
    if (updatedTenant.stripeAccountId) {
      result.stripeAccountId = updatedTenant.stripeAccountId;
    }
    if (updatedTenant.users.length > 0) {
      result.users = updatedTenant.users.map(user => user.id);
    }
    return result;
  }
}

export const SOFTDELETEOPTIONS = [
  {label: 'True', value: true, color: 'blue'},
  {label: 'False', value: false, color: 'green'}
];
