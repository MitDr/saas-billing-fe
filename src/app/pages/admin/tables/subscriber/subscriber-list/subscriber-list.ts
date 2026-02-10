import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {SUBSCRIBER_ROUTE_CONSTANT} from '../../../../../core/constant/subscriber/subscriber-list-constant';
import {SOFTDELETEOPTIONS} from '../../tenant/tenant-list/tenant-list';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {TENANT_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-list-constant';

@Component({
  selector: 'app-subscriber-list',
  imports: [
    NzButtonComponent,
    RouterLink,
    EditableDataTable
  ],
  templateUrl: './subscriber-list.html',
  styleUrl: './subscriber-list.css',
})
export class SubscriberList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  subscriberPage = signal<ListData<Subscriber> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = 'admin/tables/subscribers/created'

  subscriberListRouting = SUBSCRIBER_ROUTE_CONSTANT;
  protected readonly SUBSCRIBER_COLUMNS: ColumnConfig<Subscriber>[] = [
    {key: 'id', title: 'Id', editable: false},
    {key: 'name', title: 'Name', editable: true},
    {key: 'name', title: 'Email', editable: true},
    {key: 'subscriptions', title: 'subscriptions', editable: false},
    {key: 'createdDate', title: 'Created Date', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', editable: false},
    {key: 'tenant', title: 'Subscriber\'s tenant', type: "custom", path: 'tenant.name', editable: false},
    {key: 'softDelete', title: 'Soft Deleted', type: 'select', options: SOFTDELETEOPTIONS,editable: true }
  ]

  private subscriberService = inject(SubscriberService);
  private message = inject(NzMessageService);

  constructor() {
    effect(()=>{
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadSubscribers(page, size)
    });
  }

  private loadSubscribers(page: number, size: number){
    this.loading.set(true);

    this.subscriberService.getSubscribers(page, size).subscribe({
      next:(response)=>{
        this.subscriberPage.set(response);
        this.loading.set(false);
      },
      error: (err) =>{
        this.message.error('Không thể tải danh sách subscribers');
        this.loading.set(false);
      }
    })
  }

  onPageChange(newPage: number){
    this.currentPage.set(newPage);
  }

  onSizeChange(newSize: number){
    this.pageSize.set(newSize);
  }

  onSaveRow(updateSubscriber: Subscriber){

  }
  OnBulkDelete(ids: number[]){

  }

  protected readonly tenantListRouting = TENANT_ROUTE_CONSTANT;
}
