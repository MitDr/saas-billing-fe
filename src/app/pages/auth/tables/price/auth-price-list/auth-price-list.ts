import {Component, inject, Signal, signal} from '@angular/core';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {AuthPriceRequest} from '../../../../../core/interface/request/auth/auth-price-request';
import {ListData} from '../../../../../core/interface/list-data';
import {Price} from '../../../../../core/interface/entity/price';
import {AUTH_PRICE_ROUTE_CONSTANT, PRICE_ROUTE_CONSTANT} from '../../../../../core/constant/price/price-list-constant';
import {PriceService} from '../../../../../core/service/price-service';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../../../admin/tables/tenant/tenant-list/tenant-list';
import {
  CURRENCYOPTIONS,
  CYCLEOPTIONS,
  PRICESTATUSOPTIONS,
  SCHEMEOPTIONS
} from '../../../../admin/tables/price/price-list/price-list';
import {PriceRequest} from '../../../../../core/interface/request/price-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-price-list',
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
  templateUrl: './auth-price-list.html',
  styleUrl: './auth-price-list.css',
})
export class AuthPriceList extends AuthGenericListComponent<AuthPrice, AuthPriceRequest>{
  pricePage = signal<ListData<AuthPrice> | null>(null);

  checked = false;
  createRoute = '/app/tables/prices/create';
  priceListRouting = AUTH_PRICE_ROUTE_CONSTANT;
  private priceService = inject(AuthPriceService);

  getDataPage(): Signal<ListData<AuthPrice> | null> {
    return this.pricePage;
  }

  getColumns(): ColumnConfig<AuthPrice>[] {
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
      {key: 'plan', title: 'Plan\'s name', editable: false, type: 'custom', path: 'plan.name'},
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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.priceService.getPrices(page, size, search).subscribe({
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
  protected mapToUpdatePayload(price: AuthPrice): AuthPriceRequest {
    const result: AuthPriceRequest = {
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
    };
    if (price.plan) {
      result.planId = price.plan.id;
    }
    return result;
  }
}
