import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {WebhookLog} from '../../../../../core/interface/entity/webhook-log';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {WEBHOOK_LOG_ROUTE_CONSTANT} from '../../../../../core/constant/webhook-log/webhook-log-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookLogService} from '../../../../../core/service/webhook-log-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-webhook-log-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './webhook-log-list.html',
  styleUrl: './webhook-log-list.css',
})
export class WebhookLogList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  webhookLogPage = signal<ListData<WebhookLog> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/webhook-logs/create'
  webhookLogListRouting = WEBHOOK_LOG_ROUTE_CONSTANT;

  protected readonly WEBHOOK_LOG_COLUMNS: ColumnConfig<WebhookLog>[] =[
    {key: 'id', title: 'Id', editable: false, type: "text"},
    {key: 'eventType', title: 'Event Type', editable: true, type: "select", options: EVENTTYPEOPTION},
    {key: 'status', title: 'Status', editable: true, type: "select", options:WEBHOOKLOGSTATUSOPTION},
    {key: 'responseCode', title: 'Response Code', editable: true, type: "text"},
    {key: 'responseBody', title: 'Response Body', editable: true, type: 'text'},
    {key: 'createdDate', title: 'Created Date', editable: false, type: 'date-time'},
    {key: 'webhookEndpoint', title: 'Webhook Endpoint', type: "custom", editable: false, path: 'webhookEndpoint.url'}
  ]
  private webhookLogService = inject(WebhookLogService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadWebhookLogs(page, size);
    });
  }

  private loadWebhookLogs(page: number, size: number) {
    this.loading.set(true);

    this.webhookLogService.getWebhookLog(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        this.webhookLogPage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.message.error('Không thể tải danh sách features');
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

  onSaveRow(updateWebhookLog: WebhookLog) {
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
}

export const EVENTTYPEOPTION = [
  {label: 'Payment_Success', value: 'PAYMENT_SUCCESS', color: 'green'},
  {label: 'Subscription_Created', value: 'SUBSCRIPTION_CREATED', color: 'blue'},
  {label: 'Subscription_Cancelled', value: 'SUBSCRIPTION_CANCELLED', color: 'gray'},
  {label: 'Subscription_Renewed', value: 'SUBSCRIPTION_RENEWED', color: 'orange'},
  {label: 'Subscription_Renewal_Failed', value: 'SUBSCRIPTION_RENEWAL_FAILED', color: 'red'}
]

export const WEBHOOKLOGSTATUSOPTION = [
  {label: 'Success', value: 'SUCCESS', color: 'green'},
  {label: 'Failed', value: 'FAILED', color: 'red'},
  {label: 'No_Response', value: 'NO_RESPONSE', color: 'gray'}
]
