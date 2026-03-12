import {Component, effect, inject, input, output, signal} from '@angular/core';
import {AuthTenant} from '../../../../../core/interface/entity/auth/auth-tenant';
import {AuthTenantService} from '../../../../../core/service/auth/auth-tenant-service';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DecimalPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {UserDtoCard} from '../../DTO/user-dto-card/user-dto-card';
import {RouterLink} from '@angular/router';
import {User} from '../../../../../core/interface/entity/user';
import {AuthUserDto} from '../../../../../core/interface/DTO/auth/auth-user-dto';
import {AuthSubscriberReuseForm} from '../../../form/auth/auth-subscriber-reuse-form/auth-subscriber-reuse-form';
import {AuthTenantReuseForm} from '../../../form/auth/auth-tenant-reuse-form/auth-tenant-reuse-form';
import {AuthUserDtoCard} from '../../DTO/auth/auth-user-dto-card/auth-user-dto-card';

@Component({
  selector: 'app-auth-tenant-card',
  imports: [
    DecimalPipe,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    NzTagComponent,
    NzTooltipDirective,
    UserDtoCard,
    RouterLink,
    NzCardMetaComponent,
    NzModalComponent,
    NzModalContentDirective,
    AuthSubscriberReuseForm,
    AuthTenantReuseForm,
    AuthUserDtoCard
  ],
  templateUrl: './auth-tenant-card.html',
  styleUrl: './auth-tenant-card.css',
})
export class AuthTenantCard {
  tenant = input.required<AuthTenant>();
  isCreator = input.required<boolean>();
  tenantService = inject(AuthTenantService);
  modalService = inject(NzModalService);
  load = output<number>();
  selectedCreator = signal<AuthUserDto | null>(null);
  private message = inject(NzMessageService);
  isCreatorModalOpen = signal(false);
  refreshApi = output<void>();
  leaveTenant = output<void>();
  accountLink = output<void>();
  changeOwner = output<string>();
  openEditData = output<void>();
  deleteTenant = output<void>();
  removeUser = output<string>();

  copyApiKey(key: string): void {
    if (!key) {
      this.message.error('Không có API Key để copy');
      return;
    }

    navigator.clipboard.writeText(key)
      .then(() => {
        this.message.success('API Key đã được copy vào clipboard!');
      })
      .catch(() => {
        this.message.error('Không thể copy, vui lòng thử lại');
      });
  }

  // Chọn Creator (single)
  selectCreator(user: AuthUserDto) {
    effect(() => {
      this.selectedCreator.set(user);
      this.isCreatorModalOpen.set(false);
      this.changeOwner.emit(user.email);
    });
  }

  refreshApiKey(): void {
    this.refreshApi.emit()
  }

  maskApiKey(key: string): string {
    if (!key || key.length < 10) return 'N/A';
    const start = key.slice(0, 6);
    const end = key.slice(-4);
    return `${start}...${end}`;
  }

  onLeaveTenant() {
    this.leaveTenant.emit()
  }

  goOnboard() {
    this.accountLink.emit()
  }

  onChangeOwner() {
    this.isCreatorModalOpen.set(true);
  }

  onEdit() {
    this.openEditData.emit();
  }

  onDelete() {
    this.deleteTenant.emit();
  }

  onRemoveUser($event: string) {
    this.removeUser.emit($event);
  }
}
