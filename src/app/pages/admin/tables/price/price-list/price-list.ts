import {Component, effect, inject, signal} from '@angular/core';
import {Plan} from '../../../../../core/interface/entity/plan';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {FAKE_PLAN, PLANSTATUSOPTIONS} from '../../plan/plan-list/plan-list';
import {Price} from '../../../../../core/interface/entity/price';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {PRICE_ROUTE_CONSTANT} from '../../../../../core/constant/price/price-list-constant';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PriceService} from '../../../../../core/service/price-service';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';

@Component({
  selector: 'app-price-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './price-list.html',
  styleUrl: './price-list.css',
})
export class PriceList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  pricePage = signal<ListData<Price> | null>(null);
  loading = signal(false);


  // prices = signal<Price[]>(FAKE_PRICE);
  checked = false;
  createRoute = '/admin/tables/plans/prices'
  priceListRouting = PRICE_ROUTE_CONSTANT;

  protected readonly PRICE_COLUMNS: ColumnConfig<Price>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'price', title:'Price', editable: true, type: 'text'},
    {key: 'currency', title: 'Currency', editable: true, type: 'select', options: CURRENCYOPTIONS},
    {key: 'scheme', title: 'Scheme', editable: true, type: 'select', options: SCHEMEOPTIONS},
    {key: 'cycle', title: 'Cycle', editable: true, type: 'select', options: CYCLEOPTIONS},
    {key: 'status', title: 'Status', editable: true, type: 'select', options: PRICESTATUSOPTIONS},
    {key: 'maxUnit', title: 'Max Unit', editable: true, type: "text"},
    {key: 'cycleCount', title: 'Cycle Count', editable: true, type: "text"},
    {key: 'trialPeriod', title: 'Trial Period', editable: true, type: "text"},
    {key: 'dueDelay', title: 'Due Delay', editable: true, type: "text"},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'tenant', title: 'Tenant\'s name', editable: false, type: 'custom', path:'tenant.name'},
    {key: 'plan', title: 'Plan\'s name', editable: false, type: 'custom', path:'plan.name'},
    {key: 'softDelete', title: 'Soft Delete', editable: true, type: 'select', options: SOFTDELETEOPTIONS},
  ]

  private priceService = inject(PriceService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();

      this.loadPrices(page, size);
    });
  }

  private loadPrices(page: number, size: number) {
    this.loading.set(true);

    this.priceService.getPrices(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.pricePage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách prices');
        this.loading.set(false);
      }
    });
  }
  // Khi đổi trang
  onPageChange(newPage: number) {
    console.log('[PAGE] Changed to:', newPage);
    this.currentPage.set(newPage);
    // Không cần gọi loadFeatures nữa → effect tự chạy
  }

  // Khi đổi size
  onSizeChange(newSize: number) {
    console.log('[SIZE] Changed to:', newSize);
    this.pageSize.set(newSize);
    this.currentPage.set(1); // reset về trang 1
    // Effect tự reload
  }

  onSaveRow(updatePrice: Price) {
    // this.userService.updateUser(updatedUser).subscribe({
    //   next: () => {
    //     this.message.success('Cập nhật thành công');
    //     this.loadUsers();  // ← gọi lại API load toàn bộ list
    //   },
    //   error: () => {
    //     this.message.error('Cập nhật thất bại');
    //     // Optional: rollback cache nếu cần
    //   }
    // });
    console.log('calling api')
  }

  // Bulk delete (tương tự)
  onBulkDelete(ids: number[]) {
    // if (ids.length === 0) return;
    //
    // this.modal.confirm({
    //   nzTitle: 'Xác nhận xóa',
    //   nzContent: `Xóa ${ids.length} feature?`,
    //   nzOkText: 'Xóa',
    //   nzOkDanger: true,
    //   nzOnOk: () => {
    //     this.featureService.bulkDelete(ids).subscribe({
    //       next: () => {
    //         this.message.success('Xóa thành công');
    //         this.currentPage.set(this.currentPage()); // trigger reload
    //       },
    //       error: () => this.message.error('Xóa thất bại')
    //     });
    //   }
    // });
  }

  protected readonly featureListRouting = FEATURE_ROUTE_CONSTANT;
}

export const FAKE_PRICE: Price[] = [
  {
    "id": 2,
    "price": 50000,
    "currency": "VND",
    "scheme": "FLAT_RATE",
    "cycle": "MONTH",
    "status": "ACTIVE",
    "maxUnit": 1,
    "cycleCount": 2,
    "trialPeriod": 0,
    "dueDelay": 0,
    "createdDate": "07-10-2025 21:26:25",
    "modifiedDate": "07-10-2025 21:26:25",
    "plan": {
      "id": 1,
      "name": "Api",
      "image": '',
      "status": "ACTIVE",
      "createdDate": "07-10-2025 21:25:09",
      "modifiedDate": "07-10-2025 21:25:09",
      "softDelete": false
    },
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
    "price": 500,
    "currency": "USD",
    "scheme": "FLAT_RATE",
    "cycle": "MONTH",
    "status": "ACTIVE",
    "maxUnit": 1,
    "cycleCount": 2,
    "trialPeriod": 0,
    "dueDelay": 0,
    "createdDate": "07-10-2025 21:26:14",
    "modifiedDate": "07-10-2025 21:26:14",
    "plan": {
      "id": 1,
      "name": "Api",
      "image": '',
      "status": "ACTIVE",
      "createdDate": "07-10-2025 21:25:09",
      "modifiedDate": "07-10-2025 21:25:09",
      "softDelete": false
    },
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


