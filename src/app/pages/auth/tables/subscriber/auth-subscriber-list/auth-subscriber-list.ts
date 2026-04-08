import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {AUTH_SUBSCRIBER_ROUTE_CONSTANT} from '../../../../../core/constant/subscriber/subscriber-list-constant';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {AuthSubscriberService} from '../../../../../core/service/auth/auth-subscriber-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthSubscriberRequest} from '../../../../../core/interface/request/auth/auth-subscriber-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule, NonNullableFormBuilder, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';
import {
  AuthWebhookEndpointReuseForm
} from '../../../../../shell/components/form/auth/auth-webhook-endpoint-reuse-form/auth-webhook-endpoint-reuse-form';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {
  AuthSubscriberReuseForm
} from '../../../../../shell/components/form/auth/auth-subscriber-reuse-form/auth-subscriber-reuse-form';

@Component({
  selector: 'app-auth-subscriber-list',
  imports: [
    EditableDataTable,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    RouterLink,
    AuthWebhookEndpointReuseForm,
    NzModalComponent,
    NzModalContentDirective,
    AuthSubscriberReuseForm
  ],
  templateUrl: './auth-subscriber-list.html',
  styleUrl: './auth-subscriber-list.css',
})
export class AuthSubscriberList extends AuthGenericListComponent<AuthSubscriber, AuthSubscriberRequest> {
  subscriberPage = signal<ListData<AuthSubscriber> | null>(null);
  checked = false;
  createRoute = '/app/tables/subscribers/create'
  subscriberListRouting = AUTH_SUBSCRIBER_ROUTE_CONSTANT;
  isCreateModalOpen = signal(false);
  isSubmitting = false;
  private subscriberService = inject(AuthSubscriberService);
  private fb = inject(NonNullableFormBuilder)
  subscriberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  })

  getDataPage(): Signal<ListData<AuthSubscriber> | null> {
    return this.subscriberPage;
  }

  override getColumns(): ColumnConfig<AuthSubscriber>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'name', title: 'Name', editable: true, type: "text"},
      {key: 'email', title: 'Email', editable: true, type: "text"},
      {
        key: 'subscriptions',
        title: 'Num of subscriptions',
        editable: false,
        type: 'custom',
        path: 'subscriptions.length'
      },
      // {key: 'createdDate', title: 'Created Date', editable: false},
      // {key: 'modifiedDate', title: 'Modified Date', editable: false},
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

  onSubmitted() {
    this.isSubmitting = true;
    console.log(this.subscriberForm.value)
    if (this.subscriberForm.valid) {
      const payload: AuthSubscriberRequest = {
        name: this.subscriberForm.value.name!,
        email: this.subscriberForm.value.email!,
      }

      console.log(payload);
      this.subscriberService.createSubscriber(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Create subscriber successfully');
          this.subscriberForm.reset();
          // this.router.navigate(['/app/tables/subscribers']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create subscriber failed:', err);
          this.message.error('Create subscriber failed:');
        }
      })
    }
  }

  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  onConfirmModal() {
    this.isCreateModalOpen.set(false);
    this.reloadData()
  }

  onCloseModal() {
    this.isCreateModalOpen.set(false);
  }

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.subscriberService.getSubscribers(page, size, search).subscribe({
      next: (response) => {
        this.subscriberPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Cannot load subscribers');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updatedSubscriber: AuthSubscriber): AuthSubscriberRequest {
    const result: AuthSubscriberRequest = {
      name: updatedSubscriber.name,
      email: updatedSubscriber.email,
    }
    return result;
  }
}
