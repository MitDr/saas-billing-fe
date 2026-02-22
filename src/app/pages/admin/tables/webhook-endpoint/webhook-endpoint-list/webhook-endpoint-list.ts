import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {WebhookEndpoint} from '../../../../../core/interface/entity/webhook-endpoint';
import {
  WEBHOOK_ENDPOINT_ROUTE_CONSTANT
} from '../../../../../core/constant/webhook-endpoint/webhook-endpoint-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {WebhookEndpointService} from '../../../../../core/service/webhook-endpoint-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {WebhookEndpointRequest} from '../../../../../core/interface/request/webhook-endpoint-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-webhook-endpoint-list',
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
  templateUrl: './webhook-endpoint-list.html',
  styleUrl: './webhook-endpoint-list.css',
})
export class WebhookEndpointList extends GenericListComponent<WebhookEndpoint, WebhookEndpointRequest> {
  webhookEndpointPage = signal<ListData<WebhookEndpoint> | null>(null);
  checked = false;
  createRoute = '/admin/tables/webhook-endpoints/create'
  webhookListRouting = WEBHOOK_ENDPOINT_ROUTE_CONSTANT;
  private webhookEndpointService = inject(WebhookEndpointService);

  getDataPage(): Signal<ListData<WebhookEndpoint> | null> {
    return this.webhookEndpointPage;
  }

  override getColumns(): ColumnConfig<WebhookEndpoint>[] {
    return [
      {key: 'id', title: 'Id', editable: false, type: 'text'},
      {key: 'url', title: 'URL', type: "text", editable: true},
      {key: 'secret', title: 'Secret', type: "text", editable: false},
      {key: 'status', title: 'Status', type: 'select', editable: true, options: WEBHOOKENDPOINTSTATUSOPTION},
      // {key: 'createdDate', title: 'Created Date', type: 'date-time', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', type: 'date-time', editable: false},
      {key: 'tenant', title: 'Tenant\'s Name', type: "custom", path: 'tenant.name', editable: false}
    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.webhookListRouting;
  }

  getService() {
    return this.webhookEndpointService;
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
    this.webhookEndpointService.getWebhookEndpoints(page, size, search, tenantId).subscribe({
      next: (response) => {
        this.webhookEndpointPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách webhook endpoints');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updateWebhookEndpoint: WebhookEndpoint): WebhookEndpointRequest {
    const result: WebhookEndpointRequest = {
      url: updateWebhookEndpoint.url,
      status: updateWebhookEndpoint.status,
      tenantId: updateWebhookEndpoint.tenant.id
    }
    return result;
  }
}

export const WEBHOOKENDPOINTSTATUSOPTION = [
  {label: 'Active', value: 'ACTIVE', color: 'green'},
  {label: 'Disabled', value: 'DISABLED', color: 'red'}
]
