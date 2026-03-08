import {Component, inject, input, output} from '@angular/core';
import {AuthTenant} from '../../../../../core/interface/entity/auth/auth-tenant';
import {AuthTenantService} from '../../../../../core/service/auth/auth-tenant-service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DecimalPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {UserDtoCard} from '../../DTO/user-dto-card/user-dto-card';
import {RouterLink} from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './auth-tenant-card.html',
  styleUrl: './auth-tenant-card.css',
})
export class AuthTenantCard {
  tenant = input.required<AuthTenant>();
  tenantService = inject(AuthTenantService);
  refreshApi = output<void>();
  modalService = inject(NzModalService);
  load = output<number>();
  private message = inject(NzMessageService);

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
    this.refreshApi.emit()
  }

  maskApiKey(key: string): string {
    if (!key || key.length < 10) return 'N/A';
    const start = key.slice(0, 6);
    const end = key.slice(-4);
    return `${start}...${end}`;
  }
}
