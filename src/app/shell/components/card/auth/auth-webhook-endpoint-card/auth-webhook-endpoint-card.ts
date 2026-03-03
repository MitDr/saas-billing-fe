import {Component, effect, inject, input, output, signal} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthWebhookEndpoint} from '../../../../../core/interface/entity/auth/auth-webhook-endpoint';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {
  AuthWebhookEndpointReuseForm
} from '../../../form/auth/auth-webhook-endpoint-reuse-form/auth-webhook-endpoint-reuse-form';
import {AuthWebhookEndpointRequest} from '../../../../../core/interface/request/auth/auth-webhook-endpoint-request';

@Component({
  selector: 'app-auth-webhook-endpoint-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    TenantDtoCard,
    RouterLink,
    AuthWebhookEndpointReuseForm,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './auth-webhook-endpoint-card.html',
  styleUrl: './auth-webhook-endpoint-card.css',
})
export class AuthWebhookEndpointCard {
  webhookEndpoint = input.required<AuthWebhookEndpoint>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  // = inject(FeatureService)
  load = output<number>();
  isSubmitting = false;
  onSubmit = output<AuthWebhookEndpointRequest>()
  isCreateModalOpen = signal(false);
  private message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder);
  webhookEndpointForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DISABLED')]],
    url: ['', [Validators.required]],
  })

  constructor() {
    effect(() => {
      const currentEndpoint = this.webhookEndpoint();
      if (currentEndpoint) {
        this.webhookEndpointForm.patchValue({
          status: currentEndpoint.status,
          url: currentEndpoint.url,
        });
      }
    });
  }

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa webhook endpont #${this.webhookEndpoint().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.webhookEndpoint().id);
      }
    });
  }

  onUpdate() {
    console.log(this.webhookEndpointForm.value)
    if (this.webhookEndpointForm.valid) {
      this.isSubmitting = true;
      const payload: AuthWebhookEndpointRequest = {
        url: this.webhookEndpointForm.value.url!,
        status: this.webhookEndpointForm.value.status as 'ACTIVE' | 'DISABLED',
      }
      console.log(payload)
      this.onSubmit.emit(payload)
    }
    this.isSubmitting = false;
  }

  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  onConfirmModal() {
    this.isCreateModalOpen.set(false);
    this.load.emit(this.webhookEndpoint()?.id!)
  }

  onCloseModal() {
    this.isCreateModalOpen.set(false);
    this.load.emit(this.webhookEndpoint()?.id!)
  }
}
