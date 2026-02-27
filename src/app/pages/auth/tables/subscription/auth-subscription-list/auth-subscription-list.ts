import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {
  AUTH_SUBSCRIPTION_ROUTE_CONSTANT,
  SUBSCRIPTION_ROUTE_CONSTANT
} from '../../../../../core/constant/subscription/subscription-list-constant';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthSubscription} from '../../../../../core/interface/entity/auth/auth-subscription';
import {AuthSubscriptionRequest} from '../../../../../core/interface/request/auth/auth-subscription-request';
import {AuthSubscriptionService} from '../../../../../core/service/auth/auth-subscription-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SOFTDELETEOPTIONS} from '../../../../admin/tables/tenant/tenant-list/tenant-list';
import {
  SUBSCRIPTIONCANCELATENDOPTION,
  SUBSCRIPTONSTATUSOPTIONS, TRIALOPTION
} from '../../../../admin/tables/subscription/subscription-list/subscription-list';
import {SubscriptionRequest} from '../../../../../core/interface/request/subscription-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-subscription-list',
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
  templateUrl: './auth-subscription-list.html',
  styleUrl: './auth-subscription-list.css',
})
export class AuthSubscriptionList extends AuthGenericListComponent<AuthSubscription, AuthSubscriptionRequest>{
  subscriptionPage = signal<ListData<AuthSubscription> | null>(null);
  checked = false;
  createRoute = '/app/tables/subscriptions/create'
  subscriptionListRouting = AUTH_SUBSCRIPTION_ROUTE_CONSTANT;
  private subscriptionService = inject(AuthSubscriptionService);

  getDataPage(): Signal<ListData<AuthSubscription> | null> {
    return this.subscriptionPage;
  }

  override getColumns(): ColumnConfig<AuthSubscription>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'status', title: 'Status', editable: true, type: 'select', options: SUBSCRIPTONSTATUSOPTIONS},
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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.subscriptionService.getSubscriptions(page, size, search).subscribe({
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

  protected mapToUpdatePayload(updateSubscription: AuthSubscription): AuthSubscriptionRequest {
    const result: AuthSubscriptionRequest = {
      status: updateSubscription.status,
      quantity: updateSubscription.quantity,
      isTrial: updateSubscription.trial,
      startDate: updateSubscription.startDate,
      endDate: updateSubscription.endDate,
      cancelAtPeriodEnd: updateSubscription.cancelAtPeriodEnd,
      dueDate: updateSubscription.dueDate,
      subscriberId: updateSubscription.subscriber.id,
      priceId: updateSubscription.price.id,
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
