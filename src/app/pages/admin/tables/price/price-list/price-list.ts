import {Component, inject, Signal, signal} from '@angular/core';
import {Price} from '../../../../../core/interface/entity/price';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {PRICE_ROUTE_CONSTANT} from '../../../../../core/constant/price/price-list-constant';
import {PriceService} from '../../../../../core/service/price-service';
import {PriceRequest} from '../../../../../core/interface/request/price-request';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';

@Component({
  selector: 'app-price-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputDirective,
    NzInputWrapperComponent
  ],
  templateUrl: './price-list.html',
  styleUrl: './price-list.css',
})
export class PriceList extends GenericListComponent<Price, PriceRequest> {
  // currentPage = signal(1);   // 1-based (khớp API)
  // pageSize = signal(5);
  // pricePage = signal<ListData<Price> | null>(null);
  // loading = signal(false);
  // tenants = signal<Tenant[]>([]);
  // search = signal<string>('');
  // softDeleteFilter = signal<boolean | null>(null);
  // tenantFilter = signal<number | null>(null);
  //
  // // prices = signal<Price[]>(FAKE_PRICE);
  // checked = false;
  // createRoute = '/admin/tables/plans/prices'
  // priceListRouting = PRICE_ROUTE_CONSTANT;
  // router = inject(Router);
  // route = inject(ActivatedRoute);
  // protected readonly PRICE_COLUMNS: ColumnConfig<Price>[] = [
  //   {key: 'id', title: 'Id', editable: false},
  //   {key: 'price', title: 'Price', editable: true, type: 'text'},
  //   {key: 'currency', title: 'Currency', editable: true, type: 'select', options: CURRENCYOPTIONS},
  //   {key: 'scheme', title: 'Scheme', editable: true, type: 'select', options: SCHEMEOPTIONS},
  //   {key: 'cycle', title: 'Cycle', editable: true, type: 'select', options: CYCLEOPTIONS},
  //   {key: 'status', title: 'Status', editable: true, type: 'select', options: PRICESTATUSOPTIONS},
  //   {key: 'maxUnit', title: 'Max Unit', editable: true, type: "text"},
  //   {key: 'cycleCount', title: 'Cycle Count', editable: true, type: "text"},
  //   {key: 'trialPeriod', title: 'Trial Period', editable: true, type: "text"},
  //   {key: 'trialCycle', title: 'Trial Cycle', type: "select", editable: true, options: CYCLEOPTIONS},
  //   {key: 'dueDelay', title: 'Due Delay', editable: true, type: "text"},
  //   // {key: 'createdDate', title: 'Created Date', editable: false},
  //   // {key: 'modifiedDate', title: 'Modified Date', editable: false},
  //   {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path: 'tenant.name'},
  //   {key: 'plan', title: 'Plan\'s name', editable: false, type: 'custom', path: 'plan.name'},
  //   {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
  // ]
  // private priceService = inject(PriceService);
  // private message = inject(NzMessageService);
  // private tenantService = inject(TenantService);
  //
  // constructor() {
  //   this.route.queryParams.subscribe(params => {
  //     const page = Number(params['page']) || 1;
  //     const size = Number(params['size']) || 5;
  //     const search = params['search'] || '';
  //     const softDelete = params['softDelete'] || null;
  //     const tenantId = params['tenantId'] || null;
  //
  //     this.currentPage.set(page);
  //     this.pageSize.set(size);
  //     this.search.set(search);
  //     this.softDeleteFilter.set(softDelete);
  //     this.tenantFilter.set(tenantId);
  //   });
  //
  //   effect(() => {
  //     this.loadPrices(
  //       this.currentPage(),
  //       this.pageSize(),
  //       this.search(),
  //       this.softDeleteFilter(),
  //       this.tenantFilter(),
  //     );
  //   });
  //
  //   this.loadTenants();
  // }
  //
  // resetFilters() {
  //   this.search.set('');
  //   this.softDeleteFilter.set(null);
  //   this.tenantFilter.set(null);
  //   this.currentPage.set(1);
  // }
  //
  // // Khi đổi trang
  // onPageChange(newPage: number) {
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       page: newPage,
  //       size: this.pageSize(),
  //       search: this.search(),
  //       softDelete: this.softDeleteFilter(),
  //       tenantId: this.tenantFilter(),
  //     },
  //     queryParamsHandling: 'merge'
  //   });
  // }
  //
  // // Khi đổi size
  // onSizeChange(newSize: number) {
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       page: 1,
  //       size: newSize,
  //       search: this.search(),
  //       softDelete: this.softDeleteFilter(),
  //       tenantId: this.tenantFilter(),
  //     },
  //     queryParamsHandling: 'merge'
  //   });
  // }
  //
  // onSaveRow(updatePrice: Price) {
  //   this.priceService.updatePrice(this.mapToUpdatePayload(updatePrice), updatePrice.id).subscribe({
  //     next: () => {
  //       this.message.success('Updated successfully');
  //       this.loadPrices(
  //         this.currentPage(),
  //         this.pageSize(),
  //         this.search(),
  //         this.softDeleteFilter(),
  //         this.tenantFilter(),
  //       );
  //     },
  //     error: () => {
  //       this.message.error('Update failed');
  //       this.loadPrices(
  //         this.currentPage(),
  //         this.pageSize(),
  //         this.search(),
  //         this.softDeleteFilter(),
  //         this.tenantFilter(),
  //       );
  //     }
  //   });
  // }
  //
  // // Bulk delete (tương tự)
  // onBulkDelete(ids: number[]) {
  //   if (ids.length === 0) return;
  //   console.log(ids)
  //   this.priceService.bulkDelete(ids).subscribe({
  //     next: () => {
  //       this.loadPrices(
  //         this.currentPage(),
  //         this.pageSize(),
  //         this.search(),
  //         this.softDeleteFilter(),
  //         this.tenantFilter(),
  //       );
  //     },
  //     error: () => this.message.error('Delete Failed')
  //   });
  // }
  //
  // onBulkSoftDelete(ids: number[]) {
  //   if (ids.length === 0) return;
  //   this.priceService.bulkSoftDelete({ids: ids, softDelete: true}).subscribe({
  //     next: () => {
  //       this.loadPrices(
  //         this.currentPage(),
  //         this.pageSize(),
  //         this.search(),
  //         this.softDeleteFilter(),
  //         this.tenantFilter(),
  //       );
  //     },
  //     error: () => this.message.error('Soft Delete Failed')
  //   })
  // }
  //
  // private loadTenants() {
  //   this.tenantService.getAllTenants().subscribe({
  //     next: (res) => {
  //       this.tenants.set(res.content); // nếu trả về ListData
  //     },
  //     error: () => {
  //       this.message.error('Cannot load tenants');
  //     }
  //   });
  // }
  //
  // private loadPrices(
  //   page: number,
  //   size: number,
  //   search?: string,
  //   softDelete?: boolean | null,
  //   tenantId?: number | null,
  // ) {
  //   this.loading.set(true);
  //
  //   this.priceService.getPrices(
  //     page,
  //     size,
  //     search,
  //     softDelete,
  //     tenantId,
  //   ).subscribe({
  //     next: (response) => {
  //       this.router.navigate([], {
  //         relativeTo: this.route,
  //         queryParams: {
  //           page: page,
  //           size: this.pageSize(),
  //           search: this.search() || null,
  //           softDelete: this.softDeleteFilter(),
  //           tenantId: this.tenantFilter(),
  //         },
  //         queryParamsHandling: 'merge'
  //       });
  //       this.pricePage.set(response);
  //       this.loading.set(false);
  //     },
  //     error: () => {
  //       this.message.error('Không thể tải danh sách prices');
  //       this.loading.set(false);
  //     }
  //   });
  // }
  //
  //
  // private mapToUpdatePayload(updatePrice: Price): PriceRequest {
  //   const result: PriceRequest = {
  //     price: updatePrice.price,
  //     currency: updatePrice.currency,
  //     scheme: updatePrice.scheme,
  //     cycle: updatePrice.cycle,
  //     status: updatePrice.status,
  //     maxUnit: updatePrice.maxUnit,
  //     cycleCount: updatePrice.cycleCount,
  //     trialPeriod: updatePrice.trialPeriod,
  //     trialCycle: updatePrice.trialCycle,
  //     dueDelay: updatePrice.dueDelay,
  //     tenantId: updatePrice.tenant.id,
  //   }
  //   if (updatePrice.plan) {
  //     result.planId = updatePrice.plan.id;
  //   }
  //
  //   return result;
  // }
  pricePage = signal<ListData<Price> | null>(null);

  checked = false;
  createRoute = '/admin/tables/prices/create';
  priceListRouting = PRICE_ROUTE_CONSTANT;
  private priceService = inject(PriceService);

  getDataPage(): Signal<ListData<Price> | null> {
    return this.pricePage;
  }

  getColumns(): ColumnConfig<Price>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'price', title: 'Price', editable: true, type: 'text'},
      {key: 'currency', title: 'Currency', editable: true, type: 'select', options: CURRENCYOPTIONS},
      {key: 'scheme', title: 'Scheme', editable: true, type: 'select', options: SCHEMEOPTIONS},
      {key: 'cycle', title: 'Cycle', editable: true, type: 'select', options: CYCLEOPTIONS},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: PRICESTATUSOPTIONS},
      {key: 'maxUnit', title: 'Max Unit', editable: true, type: "text"},
      {key: 'cycleCount', title: 'Cycle Count', editable: true, type: "text"},
      {key: 'trialPeriod', title: 'Trial Period', editable: true, type: "text"},
      {key: 'trialCycle', title: 'Trial Cycle', type: "select", editable: true, options: CYCLEOPTIONS},
      {key: 'dueDelay', title: 'Due Delay', editable: true, type: "text"},
      {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path: 'tenant.name'},
      {key: 'plan', title: 'Plan\'s name', editable: false, type: 'custom', path: 'plan.name'},
      {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.priceListRouting;
  }

  getService() {
    return this.priceService;
  }

  onSearchChange(value: string) {
    if (value !== this.search()) {
      this.searchSubject.next(value);
    }
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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort?: string
  ): void {
    this.loading.set(true);
    this.priceService.getPrices(page, size, search, softDelete, tenantId).subscribe({
      next: (response) => {
        this.pricePage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách prices');
        this.loading.set(false);
      }
    });
  }

  // Implement mapToUpdatePayload
  protected mapToUpdatePayload(price: Price): PriceRequest {
    const result: PriceRequest = {
      price: price.price,
      currency: price.currency,
      scheme: price.scheme,
      cycle: price.cycle,
      status: price.status,
      maxUnit: price.maxUnit,
      cycleCount: price.cycleCount,
      trialPeriod: price.trialPeriod,
      trialCycle: price.trialCycle,
      dueDelay: price.dueDelay,
      tenantId: price.tenant.id,
    };
    if (price.plan) {
      result.planId = price.plan.id;
    }
    return result;
  }
}


export const PRICESTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Deactivated', value: 'DEACTIVATED', color: 'red'},
  {label: 'Cancel', value: 'CANCEL', color: 'gray'}
]

export const CYCLEOPTIONS = [
  {label: 'Month', value: 'MONTH', color: 'green'},
  {label: 'Day', value: 'DAY', color: 'red'},
  {label: 'Week', value: 'WEEK', color: 'blue'},
  {label: 'Year', value: 'YEAR', color: 'yellow'}
]
export const SCHEMEOPTIONS = [
  {label: 'Flat-rate', value: 'FLAT_RATE', color: 'green'},
  {label: 'Per-unit', value: 'PER_UNIT', color: 'blue'},
]
export const CURRENCYOPTIONS = [
  {label: 'Usd', value: 'USD', color: 'green'},
  {label: 'Vnd', value: 'VND', color: 'red'},
]


