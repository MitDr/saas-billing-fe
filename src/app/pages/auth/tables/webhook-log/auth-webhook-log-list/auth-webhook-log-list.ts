import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {WebhookLog} from '../../../../../core/interface/entity/webhook-log';
import {
  AUTH_WEBHOOK_LOG_ROUTE_CONSTANT,
  WEBHOOK_LOG_ROUTE_CONSTANT
} from '../../../../../core/constant/webhook-log/webhook-log-list-constant';
import {WebhookLogService} from '../../../../../core/service/webhook-log-service';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthWebhookLog} from '../../../../../core/interface/entity/auth/auth-webhook-log';
import {AuthWebhookLogRequest} from '../../../../../core/interface/request/auth/auth-webhook-log-request';
import {AuthWebhookLogService} from '../../../../../core/service/auth/auth-webhook-log-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {
  EVENTTYPEOPTION,
  WEBHOOKLOGSTATUSOPTION
} from '../../../../admin/tables/webhook-log/webhook-log-list/webhook-log-list';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-webhook-log-list',
  imports: [
    EditableDataTable,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    RouterLink
  ],
  templateUrl: './auth-webhook-log-list.html',
  styleUrl: './auth-webhook-log-list.css',
})
export class AuthWebhookLogList extends AuthGenericListComponent<AuthWebhookLog, AuthWebhookLogRequest> {
  webhookLogPage = signal<ListData<AuthWebhookLog> | null>(null);
  checked = false;
  createRoute = '/app/tables/webhook-logs/create'
  webhookLogListRouting = AUTH_WEBHOOK_LOG_ROUTE_CONSTANT;
  private webhookLogService = inject(AuthWebhookLogService);

  getDataPage(): Signal<ListData<AuthWebhookLog> | null> {
    return this.webhookLogPage;
  }

  override getColumns(): ColumnConfig<AuthWebhookLog>[] {
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
    sort?: string
  ): void {
    this.loading.set(true);
    this.webhookLogService.getWebhookLogs(page, size, search).subscribe({
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

  protected mapToUpdatePayload(updateWebhookLog: AuthWebhookLog): AuthWebhookLogRequest {
    const result: AuthWebhookLogRequest = {
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
