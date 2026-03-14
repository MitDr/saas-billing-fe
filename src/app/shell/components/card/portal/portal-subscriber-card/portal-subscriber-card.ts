import {Component, inject, input, output, signal} from '@angular/core';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {PortalSubscriber} from '../../../../../core/interface/portal/portal-subscriber';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {AuthSubscriberReuseForm} from '../../../form/auth/auth-subscriber-reuse-form/auth-subscriber-reuse-form';

@Component({
  selector: 'app-portal-subscriber-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzButtonComponent,
    NzIconDirective,
    AuthSubscriberReuseForm,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './portal-subscriber-card.html',
  styleUrl: './portal-subscriber-card.css',
})
export class PortalSubscriberCard {
  subscriber = input.required<PortalSubscriber>();
  openEdit = output<PortalSubscriber>();
  modalService = inject(NzModalService);
  private message = inject(NzMessageService)
  isEditModalOpen = signal(false);


  openEditModal() {
    this.isEditModalOpen.set(true);
  }

  onConfirmModal(){
    this.isEditModalOpen.set(false);
  }

  onCloseModal(){
    this.isEditModalOpen.set(false);
  }
}
