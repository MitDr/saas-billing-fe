import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Payout} from '../../../../../core/interface/entity/payout';
import {PAYOUT_ROUTE_CONSTANT} from '../../../../../core/constant/payout/payout-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {CURRENCYOPTIONS} from '../../price/price-list/price-list';
import {PayoutService} from '../../../../../core/service/payout-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {PayoutRequest} from '../../../../../core/interface/request/payout-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-payout-list',
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
  templateUrl: './payout-list.html',
  styleUrl: './payout-list.css',
})
export class PayoutList extends GenericListComponent<Payout, PayoutRequest> {
  payoutPage = signal<ListData<Payout> | null>(null);
  checked = false;
  createRoute = '/admin/tables/payouts/create'
  payoutListRouting = PAYOUT_ROUTE_CONSTANT;
  private payoutService = inject(PayoutService)

  getDataPage(): Signal<ListData<Payout> | null> {
    return this.payoutPage;
  }

  override getColumns(): ColumnConfig<Payout>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'amount', title: 'Amount', editable: true, type: "text"},
      {key: 'currency', title: 'Currency', type: 'select', editable: true, options: CURRENCYOPTIONS},
      // {key: 'stripeTransferId', title: 'TransferId', editable: true, type: "text"},
      {key: 'stripePayoutId', title: 'PayoutId', editable: true, type: 'text'},
      {key: 'status', title: 'Status', editable: true, type: "select", options: PAYOUTSTATUSOPTION},
      // {key: 'stripeBalanceTransactionId', title: 'B.Transaction Id', editable: true, type: "text"},
      {key: 'tenant', title: 'Tenant\'s Name', editable: false, type: 'custom', path: 'tenant.name'}

    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.payoutListRouting;
  }

  getService() {
    return this.payoutService;
  }

  onSearchChange(value: string) {
    if (value !== this.search()) {
      this.searchSubject.next(value);
    }
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
    this.payoutService.getPayouts(page, size, search, tenantId).subscribe({
      next: (response) => {
        this.payoutPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách payouts');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updatePayout: Payout): PayoutRequest {
    const result: PayoutRequest = {
      amount: updatePayout.amount,
      currency: updatePayout.currency,
      status: updatePayout.status,
      tenantId: updatePayout.tenant.id
    }

    if (updatePayout.stripePayoutId) {
      result.stripePayoutId = updatePayout.stripePayoutId
    }
    if (updatePayout.stripeTransferId) {
      result.stripeTransferId = updatePayout.stripeTransferId
    }
    if (updatePayout.stripeBalanceTransactionId) {
      result.stripeBalanceTransactionId = updatePayout.stripeBalanceTransactionId
    }

    return result;
  }
}

export const PAYOUTSTATUSOPTION = [
  {label: 'Success', value: 'SUCCESS', color: 'green'},
  {label: 'Requested', value: 'REQUESTED', color: 'blue'},
  {label: 'Processing', value: 'PROCESSING', color: 'orange'},
  {label: 'Failed', value: 'FAILED', color: 'red'}
]
