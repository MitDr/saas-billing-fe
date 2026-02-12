import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {WebhookEndpoint} from '../../../../../core/interface/entity/webhook-endpoint';
import {
  WEBHOOK_ENDPOINT_ROUTE_CONSTANT
} from '../../../../../core/constant/webhook-endpoint/webhook-endpoint-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookEndpointService} from '../../../../../core/service/webhook-endpoint-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-webhook-endpoint-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './webhook-endpoint-list.html',
  styleUrl: './webhook-endpoint-list.css',
})
export class WebhookEndpointList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  webhookEndpointPage = signal<ListData<WebhookEndpoint> | null>(null);
  loading = signal(false);

  checked= false;
  createRoute  = '/admin/tables/webhook-endpoints/create'
  webhookListRouting = WEBHOOK_ENDPOINT_ROUTE_CONSTANT;

  protected readonly WEBHOOK_ENDPOINT_COLUMNS: ColumnConfig<WebhookEndpoint>[] = [
    {key: 'id', title: 'Id', editable: false, type: 'text'},
    {key: 'url',title: 'URL', type: "text", editable: true},
    {key: 'secret', title: 'Secret', type: "text", editable: false},
    {key: 'status', title: 'Status', type: 'select', editable: true, options: WEBHOOKENDPOINTSTATUSOPTION},
    {key: 'createdDate', title: 'Created Date', type: 'date-time', editable: false},
    {key: 'modifiedDate', title: 'Modified Date', type: 'date-time', editable: false},
    {key: 'tenant', title: 'Tenant\'s Name', type: "custom", path: 'tenant.name', editable: false}
  ]

  private webhookEndpointService = inject(WebhookEndpointService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadWebhookEndpoints(page, size);
    });
  }

  private loadWebhookEndpoints(page: number, size: number) {
    this.loading.set(true);

    this.webhookEndpointService.getWebhookEndpoints(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        this.webhookEndpointPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.message.error('Không thể tải danh sách features');
        this.loading.set(false);
      }
    });
  }

  onPageChange(newPage: number) {
    console.log('[PAGE] Changed to:', newPage);
    this.currentPage.set(newPage);
  }

  onSizeChange(newSize: number) {
    console.log('[SIZE] Changed to:', newSize);
    this.pageSize.set(newSize);
    this.currentPage.set(1); // reset về trang 1
  }

  onSaveRow(updateWebhookEndpoint: WebhookEndpoint) {
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
}

export const WEBHOOKENDPOINTSTATUSOPTION = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Disabled', value: 'DISABLED', color: 'red'}
]
