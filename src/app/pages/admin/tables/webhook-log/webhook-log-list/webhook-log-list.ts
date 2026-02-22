import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {WebhookLog} from '../../../../../core/interface/entity/webhook-log';
import {WEBHOOK_LOG_ROUTE_CONSTANT} from '../../../../../core/constant/webhook-log/webhook-log-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {WebhookLogService} from '../../../../../core/service/webhook-log-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {WebhookLogRequest} from '../../../../../core/interface/request/webhook-log-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-webhook-log-list',
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
  templateUrl: './webhook-log-list.html',
  styleUrl: './webhook-log-list.css',
})
export class WebhookLogList extends GenericListComponent<WebhookLog, WebhookLogRequest> {
  webhookLogPage = signal<ListData<WebhookLog> | null>(null);
  checked = false;
  createRoute = '/admin/tables/webhook-logs/create'
  webhookLogListRouting = WEBHOOK_LOG_ROUTE_CONSTANT;
  private webhookLogService = inject(WebhookLogService);

  getDataPage(): Signal<ListData<WebhookLog> | null> {
    return this.webhookLogPage;
  }

  override getColumns(): ColumnConfig<WebhookLog>[] {
    return [
      {key: 'id', title: 'Id', editable: false, type: "text"},
      {key: 'eventType', title: 'Event Type', editable: true, type: "select", options: EVENTTYPEOPTION},
      {key: 'status', title: 'Status', editable: true, type: "select", options: WEBHOOKLOGSTATUSOPTION},
      {key: 'responseCode', title: 'Response Code', editable: true, type: "text"},
      {key: 'responseBody', title: 'Response Body', editable: true, type: 'text'},
      // {key: 'createdDate', title: 'Created Date', editable: false, type: 'date-time'},
      {key: 'webhookEndpoint', title: 'Webhook Endpoint', type: "custom", editable: false, path: 'webhookEndpoint.url'}

    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.webhookLogListRouting;
  }

  getService() {
    return this.webhookLogService;
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
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort?: string
  ): void {
    this.loading.set(true);
    this.webhookLogService.getWebhookLogs(page, size, search, softDelete, tenantId).subscribe({
      next: (response) => {
        this.webhookLogPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách webhook-logs');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updateWebhookLog: WebhookLog): WebhookLogRequest {
    const result: WebhookLogRequest = {
      eventType: updateWebhookLog.eventType,
      status: updateWebhookLog.status,
      data: updateWebhookLog.data,
      responseCode: updateWebhookLog.responseCode,
      responseBody: updateWebhookLog.responseBody,
      webhookEndpointId: updateWebhookLog.webhookEndpoint.id
    }
    return result
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
