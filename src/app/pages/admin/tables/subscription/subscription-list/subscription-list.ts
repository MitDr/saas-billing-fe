import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {SUBSCRIPTION_ROUTE_CONSTANT} from '../../../../../core/constant/subscription/subscription-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {SubscriptionRequest} from '../../../../../core/interface/request/subscription-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-subscription-list',
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
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css',
})
export class SubscriptionList extends GenericListComponent<Subscription, SubscriptionRequest> {
  subscriptionPage = signal<ListData<Subscription> | null>(null);
  checked = false;
  createRoute = '/admin/tables/subscriptions/create'
  subscriptionListRouting = SUBSCRIPTION_ROUTE_CONSTANT;
  private subscriptionService = inject(SubscriptionService);

  getDataPage(): Signal<ListData<Subscription> | null> {
    return this.subscriptionPage;
  }

  override getColumns(): ColumnConfig<Subscription>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: SUBSCRIPTONSTATUSOPTIONS},
      {key: 'defaultPaymentMethod', title: 'Default Payment Method', editable: true, formatUUID: true, type: "text"},
      {key: 'quantity', title: 'Quantity', editable: true},
      {key: 'startDate', title: 'Start Date', editable: true, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      {key: 'endDate', title: 'End Date', editable: true, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      {key: 'cancelDate', title: 'Cancel date', editable: true, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      {
        key: 'cancelAtPeriodEnd',
        title: 'Cancel At End',
        type: 'select',
        options: SUBSCRIPTIONCANCELATENDOPTION,
        editable: true
      },
      {key: 'dueDate', title: 'Due Date', editable: true, type: 'date-time', dateFormat: 'dd-MM-yyyy'},
      {key: 'trial', title: 'Trial', editable: true, type: 'select', options: TRIALOPTION},
      {key: 'softDelete', title: 'Soft Delete', editable: false, type: 'select', options: SOFTDELETEOPTIONS}

    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.subscriptionListRouting;
  }

  getService() {
    return this.subscriptionService;
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
    this.subscriptionService.getSubscriptions(page, size, search, softDelete, tenantId).subscribe({
      next: (response) => {
        this.subscriptionPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách subscriptions');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updateSubscription: Subscription): SubscriptionRequest {
    const result: SubscriptionRequest = {
      status: updateSubscription.status,
      quantity: updateSubscription.quantity,
      isTrial: updateSubscription.trial,
      startDate: updateSubscription.startDate,
      endDate: updateSubscription.endDate,
      cancelAtPeriodEnd: updateSubscription.cancelAtPeriodEnd,
      dueDate: updateSubscription.dueDate,
      subscriberId: updateSubscription.subscriber.id,
      priceId: updateSubscription.price.id,
      tenantId: updateSubscription.tenant.id,
    }
    if (updateSubscription.cancelDate) {
      result.cancelDate = updateSubscription.cancelDate;
    }
    if (updateSubscription.invoices.length > 0) {
      result.invoices = updateSubscription.invoices.map(invoice => invoice.id);
    }
    if (updateSubscription.metadata) {
      result.metadata = updateSubscription.metadata;
    }
    return result;
  }
}

//
export const SUBSCRIPTONSTATUSOPTIONS = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Draft', value: 'DRAFT', color: 'red'},
  {label: 'Pending', value: 'PENDING', color: 'blue'},
  {label: 'Ended', value: 'ENDED', color: 'yellow'},
  {label: 'Cancel', value: 'CANCEL', color: 'orange'}
]

export const SUBSCRIPTIONCANCELATENDOPTION = [
  {label: 'True', value: true, color: 'green'},
  {label: 'False', value: false, color: 'red'},
]
export const TRIALOPTION = [
  {label: 'True', value: true, color: 'green'},
  {label: 'False', value: false, color: 'red'},
]
