import {Component, inject, input, output, signal} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {SubscriptionDtoCard} from '../../DTO/subscription-dto-card/subscription-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';
import {AuthSubscriptionDtoCard} from '../../DTO/auth/auth-subscription-dto-card/auth-subscription-dto-card';
import {AuthSubscriberRequest} from '../../../../../core/interface/request/auth/auth-subscriber-request';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthSubscriberReuseForm} from '../../../form/auth/auth-subscriber-reuse-form/auth-subscriber-reuse-form';

@Component({
  selector: 'app-auth-subscriber-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    SubscriptionDtoCard,
    TenantDtoCard,
    RouterLink,
    AuthSubscriptionDtoCard,
    AuthSubscriberReuseForm,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './auth-subscriber-card.html',
  styleUrl: './auth-subscriber-card.css',
})
export class AuthSubscriberCard {
  subscriber = input.required<AuthSubscriber>()
  isUpdateModalOpen = signal(false);
  updateSubscriber = output<AuthSubscriberRequest>();
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  portal = output<number>();
  modalService = inject(NzModalService);
  isSubmitting = false;
  // subscriberService = inject(SubscriberService)
  load = output<number>();
  private message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)

  subscriberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  })

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: `Delete Subscriber #${this.subscriber().id} ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.subscriber().id);
      }
    });
  }

  openPortal() {
    this.modalService.confirm({
      nzTitle: 'Open Portal',
      nzContent: `Open Portal for Subscriber #${this.subscriber().id} ?`,
      nzOkText: 'Open',
      nzOkDanger: true,
      nzOnOk: () => {
        this.portal.emit(this.subscriber().id);
      }
    });
  }

  openUpdateModal() {
    this.isUpdateModalOpen.set(true);
    this.subscriberForm.patchValue({
      name: this.subscriber().name,
      email: this.subscriber().email
    })
  }

  onConfirmModal() {
    this.isSubmitting = true;
    this.isUpdateModalOpen.set(false);
    if (this.subscriberForm.valid) {
      const payload: AuthSubscriberRequest = {
        name: this.subscriberForm.value.name!,
        email: this.subscriberForm.value.email!
      };

      this.updateSubscriber.emit(payload)
      this.isSubmitting = false
    }
  }

  onCloseModal() {
    this.isUpdateModalOpen.set(false);
  }
}
