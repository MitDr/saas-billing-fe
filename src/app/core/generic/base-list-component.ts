import {effect, inject, signal, Signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Tenant} from '../interface/entity/tenant';
import {TenantService} from '../service/tenant-service';
import {ListData} from '../interface/list-data';
import {ColumnConfig} from '../interface/column-config';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

export interface Entity {
  id: number;
}

export abstract class GenericListComponent<T extends Entity, R> {
  // Signals chung
  currentPage = signal<number>(1);
  pageSize = signal<number>(5);
  loading = signal<boolean>(false);
  search = signal<string>('');
  softDeleteFilter = signal<boolean | null>(null);
  tenantFilter = signal<number | null>(null);
  tenants = signal<Tenant[]>([]);
  // Optional: sort cho các component cần (Entitlement)
  sort = signal<string>('id,asc');
  // Injections chung
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected message = inject(NzMessageService);
  protected tenantService = inject(TenantService);
  protected searchSubject = new Subject<string>();

  constructor() {
    // Subscribe query params (chung)
    this.route.queryParams.subscribe(params => {
      this.currentPage.set(Number(params['page']) || 1);
      this.pageSize.set(Number(params['size']) || 5);
      this.search.set(params['search'] || '');
      this.softDeleteFilter.set(params['softDelete'] ? params['softDelete'] === 'true' : null); // Handle string to boolean
      this.tenantFilter.set(params['tenantId'] ? Number(params['tenantId']) : null);
      if (params['sort']) this.sort.set(params['sort']);
    });

    effect(() => {
      this.loadData(
        this.currentPage(),
        this.pageSize(),
        this.search(),
        this.softDeleteFilter(),
        this.tenantFilter(),
        this.sort()
      );
    });

    this.loadTenants();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value) => {
      if (value !== this.search()) {
        this.search.set(value);
        this.currentPage.set(1);
        this.syncUrl({page: 1});
      }
    });
  }

  abstract getDataPage(): Signal<ListData<T> | null>;

  abstract getColumns(): ColumnConfig<T>[];

  abstract getCreateRoute(): string;

  abstract getRoutingConstant(): any;

  // Method chung: Reset filters
  resetFilters() {
    this.search.set('');
    this.softDeleteFilter.set(null);
    this.tenantFilter.set(null);
    this.currentPage.set(1);
    this.syncUrl({page: 1});  // Sync URL clean
  }

  // Method chung: Page change
  onPageChange(newPage: number) {
    this.currentPage.set(newPage);  // Set signal trước để effect trigger
    this.syncUrl({page: newPage});  // Sync URL ngay
  }

  // Method chung: Size change
  onSizeChange(newSize: number) {
    this.pageSize.set(newSize);
    this.currentPage.set(1);  // Reset page
    this.syncUrl({page: 1, size: newSize});
  }

  // Method chung: Bulk delete
  onBulkDelete(ids: number[]) {
    if (ids.length === 0) return;
    console.log(ids); // Giữ từ code gốc
    this.getService().bulkDelete(ids).subscribe({
      next: () => {
        this.message.success('Deleted successfully'); // Add success message
        this.reloadData();
      },
      error: () => this.message.error('Delete Failed')
    });
  }

  onBulkSoftDelete(request: SoftDeleteRequest) {
    if (request.ids.length === 0) return;
    this.getService().bulkSoftDelete(request).subscribe({
      next: () => {
        this.message.success('Soft Deleted successfully'); // Add success
        this.reloadData();
      },
      error: () => this.message.error('Soft Delete Failed')
    });
  }

  onSaveRow(updateEntity: T) {
    const service = this.getService();
    service.update(this.mapToUpdatePayload(updateEntity), updateEntity.id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.reloadData();
      },
      error: () => {
        this.message.error('Update failed');
        this.reloadData(); // Reload để rollback UI
      }
    });
  }

  protected abstract getService(): any;

  protected syncUrl(extraParams: Partial<{ page?: number; size?: number; sort?: string }> = {}) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: extraParams.page ?? this.currentPage(),
        size: extraParams.size ?? this.pageSize(),
        search: this.search() || null,  // null để clear nếu empty
        softDelete: this.softDeleteFilter(),
        tenantId: this.tenantFilter(),
        ...(this.sort() !== 'id,asc' && {sort: this.sort()}),  // optional
        ...extraParams,  // cho page/size/sort override
      },
      queryParamsHandling: 'merge'
    });
  }

  // Abstract: Load data (subclass implement API call, set getDataPage())
  protected abstract loadData(
    page: number,
    size: number,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort?: string
  ): void;

  // Abstract: Map to payload
  protected abstract mapToUpdatePayload(entity: T): R;

  // Private chung: Reload data (gọi loadData với current state)
  private reloadData() {
    this.loadData(
      this.currentPage(),
      this.pageSize(),
      this.search(),
      this.softDeleteFilter(),
      this.tenantFilter(),
      this.sort()
    );
  }

  // Private chung: Load tenants
  private loadTenants() {
    this.tenantService.getAllTenants().subscribe({
      next: (res) => this.tenants.set(res.content),
      error: () => this.message.error('Cannot load tenants')
    });
  }
}
