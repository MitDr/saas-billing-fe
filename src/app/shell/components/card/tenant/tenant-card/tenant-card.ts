import {Component, inject, input, output} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserCard} from '../../user/user-card/user-card';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {UserDtoCard} from '../../DTO/user-dto-card/user-dto-card';
import {TenantService} from '../../../../../core/service/tenant-service';
import {TenantRequest} from '../../../../../core/interface/request/tenant-request';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-tenant-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    DecimalPipe,
    RouterLink,
    UserCard,
    NzPopconfirmDirective,
    NzTooltipDirective,
    UserDtoCard,
  ],
  templateUrl: './tenant-card.html',
  styleUrl: './tenant-card.css',
})
export class TenantCard {
  tenant = input.required<Tenant>()
  tenantService = inject(TenantService);
  refreshApi = output<number>();
  modalService = inject(NzModalService);
  deleteButton = output<number>();
  load = output<number>();
  private message = inject(NzMessageService);

// Hàm copy
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

  refreshApiKey(): void {
    this.refreshApi.emit(this.tenant().id)
  }

  maskApiKey(key: string): string {
    if (!key || key.length < 10) return 'N/A';
    const start = key.slice(0, 6);
    const end = key.slice(-4);
    return `${start}...${end}`;
  }

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa tenant #${this.tenant().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.tenant().id);
      }
    });
  }

  onRemoveUser(id: number) {
    if (id === this.tenant().creator.id) {
      this.message.error('Cannot remove creator');
      return;
    }
    this.tenantService.updateTenant(this.removeUserAndMapTenantToTenantRequest(this.tenant(), id), this.tenant().id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.load.emit(this.tenant().id);
      },
      error: () => {
        this.message.error('Update failed');
        this.load.emit(this.tenant().id);
      }
    });
  }

  removeUserAndMapTenantToTenantRequest(updatedTenant: Tenant, id: number): TenantRequest {
    const result: TenantRequest = {
      name: updatedTenant.name,
      email: updatedTenant.email,
      currentAmount: updatedTenant.currentAmount,
      pendingAmount: updatedTenant.pendingAmount,
      creatorId: updatedTenant.creator.id,
    }
    if (updatedTenant.stripeAccountId) {
      result.stripeAccountId = updatedTenant.stripeAccountId;
    }
    if (updatedTenant.users.length > 0) {
      result.users = updatedTenant.users
        .filter(user => user.id !== id)
        .map(user => user.id);
    }
    return result;
  }
}
