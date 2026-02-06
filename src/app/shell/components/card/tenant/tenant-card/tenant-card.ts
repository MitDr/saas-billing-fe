import { Component, inject, input } from '@angular/core';
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
    NzPopconfirmDirective
  ],
  templateUrl: './tenant-card.html',
  styleUrl: './tenant-card.css',
})
export class TenantCard {
  tenant = input.required<Tenant>()

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

// Hàm refresh (placeholder - bạn sẽ thay bằng API call thật)
  refreshApiKey(): void {
    this.message.info('Đang gửi yêu cầu refresh API Key...');

    // Ví dụ gọi API (bạn thay bằng service thật)
    // this.tenantService.refreshApiKey(this.tenant().id).subscribe({
    //   next: (newKey) => {
    //     // Cập nhật tenant với key mới (nếu có response)
    //     this.tenant.update(t => ({ ...t, apiKey: newKey.apiKey }));
    //     this.message.success('API Key đã được tạo mới thành công!');
    //   },
    //   error: () => {
    //     this.message.error('Refresh API Key thất bại');
    //   }
    // });

    // Demo giả lập
    setTimeout(() => {
      this.message.success('API Key mới đã được tạo (demo)');
      // Nếu bạn dùng signal cho tenant, có thể update:
      // this.tenant.update(t => ({ ...t, apiKey: 'sk_new_fake_key_xxx' }));
    }, 1500);
  }

  maskApiKey(key: string): string {
    if (!key || key.length < 10) return 'N/A';
    const start = key.slice(0, 6);
    const end = key.slice(-4);
    return `${start}...${end}`;
  }
}
