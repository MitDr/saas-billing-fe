import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SUBSCRIBER_ROUTE_CONSTANT} from '../../../../../core/constant/subscriber/subscriber-list-constant';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {SubscriberRequest} from '../../../../../core/interface/request/subscriber-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-subscriber-list',
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
  templateUrl: './subscriber-list.html',
  styleUrl: './subscriber-list.css',
})
export class SubscriberList extends GenericListComponent<Subscriber, SubscriberRequest> {
  subscriberPage = signal<ListData<Subscriber> | null>(null);
  checked = false;
  createRoute = 'admin/tables/subscribers/created'
  subscriberListRouting = SUBSCRIBER_ROUTE_CONSTANT;
  private subscriberService = inject(SubscriberService);

  getDataPage(): Signal<ListData<Subscriber> | null> {
    return this.subscriberPage;
  }

  override getColumns(): ColumnConfig<Subscriber>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: "text"},
      {key: 'email', title: 'Email', editable: true, type: "text"},
      {key: 'customerId', title: 'CustomerId', editable: false, type: "text"},
      {
        key: 'subscriptions',
        title: 'Num of subscriptions',
        editable: false,
        type: 'custom',
        path: 'subscriptions.length'
      },
      // {key: 'createdDate', title: 'Created Date', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false},
      {key: 'tenant', title: 'Subscriber\'s tenant', type: "custom", path: 'tenant.name', editable: false},
      {key: 'softDelete', title: 'Soft Deleted', type: 'select', options: SOFTDELETEOPTIONS, editable: false}
    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.subscriberListRouting;
  }

  getService() {
    return this.subscriberService;
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
    this.subscriberService.getSubscribers(page, size, search, softDelete, tenantId).subscribe({
      next: (response) => {
        this.subscriberPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách subscribers');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updatedSubscriber: Subscriber): SubscriberRequest {
    const result: SubscriberRequest = {
      name: updatedSubscriber.name,
      email: updatedSubscriber.email,
      tenantId: updatedSubscriber.tenant.id
    }
    return result;
  }
}
