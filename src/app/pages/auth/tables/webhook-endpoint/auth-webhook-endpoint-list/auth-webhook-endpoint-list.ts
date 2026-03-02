import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {WebhookEndpoint} from '../../../../../core/interface/entity/webhook-endpoint';
import {
  AUTH_WEBHOOK_ENDPOINT_ROUTE_CONSTANT,
  WEBHOOK_ENDPOINT_ROUTE_CONSTANT
} from '../../../../../core/constant/webhook-endpoint/webhook-endpoint-list-constant';
import {WebhookEndpointService} from '../../../../../core/service/webhook-endpoint-service';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthWebhookEndpoint} from '../../../../../core/interface/entity/auth/auth-webhook-endpoint';
import {AuthWebhookEndpointRequest} from '../../../../../core/interface/request/auth/auth-webhook-endpoint-request';
import {AuthWebhookEndpointService} from '../../../../../core/service/auth/auth-webhook-endpoint-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {
  WEBHOOKENDPOINTSTATUSOPTION
} from '../../../../admin/tables/webhook-endpoint/webhook-endpoint-list/webhook-endpoint-list';
import {WebhookEndpointRequest} from '../../../../../core/interface/request/webhook-endpoint-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule, NonNullableFormBuilder, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  WebhookEndpointReuseForm
} from '../../../../../shell/components/form/admin/webhook-endpoint-reuse-form/webhook-endpoint-reuse-form';
import {NzMessageService} from 'ng-zorro-antd/message';
import {
  AuthWebhookEndpointReuseForm
} from '../../../../../shell/components/form/auth/auth-webhook-endpoint-reuse-form/auth-webhook-endpoint-reuse-form';

@Component({
  selector: 'app-auth-webhook-endpoint-list',
  imports: [
    EditableDataTable,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    RouterLink,
    NzCardComponent,
    NzCardMetaComponent,
    NzCheckboxComponent,
    NzIconDirective,
    NzModalContentDirective,
    NzModalComponent,
    Breadcrumb,
    WebhookEndpointReuseForm,
    AuthWebhookEndpointReuseForm
  ],
  templateUrl: './auth-webhook-endpoint-list.html',
  styleUrl: './auth-webhook-endpoint-list.css',
})
export class AuthWebhookEndpointList extends AuthGenericListComponent<AuthWebhookEndpoint, AuthWebhookEndpointRequest> {
  webhookEndpointPage = signal<ListData<AuthWebhookEndpoint> | null>(null);
  checked = false;
  createRoute = '/app/tables/webhook-endpoints/create'
  webhookListRouting = AUTH_WEBHOOK_ENDPOINT_ROUTE_CONSTANT;
  private webhookEndpointService = inject(AuthWebhookEndpointService);
  isCreateModalOpen = signal(false);
  isSubmitting = false;
  private fb = inject(NonNullableFormBuilder)
  webhookEndpointForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DISABLED')]],
    url: ['', [Validators.required]],
  })

  getDataPage(): Signal<ListData<AuthWebhookEndpoint> | null> {
    return this.webhookEndpointPage;
  }

  override getColumns(): ColumnConfig<AuthWebhookEndpoint>[] {
    return [
      {key: 'id', title: 'Id', editable: false, type: 'text'},
      {key: 'url', title: 'URL', type: "text", editable: true},
      {key: 'secret', title: 'Secret', type: "text", editable: false},
      {key: 'status', title: 'Status', type: 'select', editable: true, options: WEBHOOKENDPOINTSTATUSOPTION},
      // {key: 'createdDate', title: 'Created Date', type: 'date-time', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', type: 'date-time', editable: false},
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

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.webhookEndpointService.getWebhookEndpoints(page, size, search).subscribe({
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

  protected mapToUpdatePayload(updateWebhookEndpoint: AuthWebhookEndpoint): AuthWebhookEndpointRequest {
    const result: AuthWebhookEndpointRequest = {
      url: updateWebhookEndpoint.url,
      status: updateWebhookEndpoint.status,
    }
    return result;
  }

  onSubmitted() {
    console.log(this.webhookEndpointForm.value)

    if (this.webhookEndpointForm.valid) {
      this.isSubmitting = true;
      const payload: AuthWebhookEndpointRequest = {
        url: this.webhookEndpointForm.value.url!,
        status: this.webhookEndpointForm.value.status as 'ACTIVE' | 'DISABLED',
      }

      console.log(payload)
      this.webhookEndpointService.createWebhookEndpoint(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo endpoint thành công');
          this.webhookEndpointForm.reset();
          // this.router.navigate(['/app/tables/webhook-endpoints']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create endpoint failed:', err);
          this.message.error('Tạo endpoint thất bại');
        }
      })
    }
  }

  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  onConfirmModal(){
    this.isCreateModalOpen.set(false);
    this.reloadData()
  }

  onCloseModal(){
    this.isCreateModalOpen.set(false);
  }
}
