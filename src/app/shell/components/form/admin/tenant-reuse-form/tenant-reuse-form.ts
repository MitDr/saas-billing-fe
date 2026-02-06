import {Component, inject, input, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-tenant-reuse-form',
  imports: [
    ReactiveFormsModule,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzRowDirective,
    NzButtonComponent,
    NzTagComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    NzTooltipDirective
  ],
  templateUrl: './tenant-reuse-form.html',
  styleUrl: './tenant-reuse-form.css',
})
export class TenantReuseForm {
  private message = inject(NzMessageService);

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Update Tenant');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false); // true khi edit, false khi create

  submitted = output<void>();

  // Getter cho các control
  get name() { return this.formGroup()?.get('name'); }
  get email() { return this.formGroup()?.get('email'); }
  get creatorId() { return this.formGroup()?.get('creatorId'); }
  get users() { return this.formGroup()?.get('users'); }
  get currentAmount() { return this.formGroup()?.get('currentAmount'); }
  get pendingAmount() { return this.formGroup()?.get('pendingAmount'); }
  get apiKey() {return this.formGroup()?.get('apiKey')};
  // Danh sách user để chọn (super admin load từ API)
  // availableUsers = input<any[]>([]); // Bạn truyền từ parent: [{id: number, username: string, email: string}]

  availableUsers = signal([
    { id: 4, username: 'Lonnng3', email: 'long3@gmail.com' },
    { id: 5, username: 'Lonnng4', email: 'long4@gmail.com' },
    { id: 6, username: 'SuperAdmin', email: 'admin@example.com' },
    // ... load thêm từ API
  ]);

  onSubmit(): void {
    const form = this.formGroup();
    if (form?.valid) {
      this.submitted.emit();
    } else {
      Object.values(form?.controls || {}).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Hàm cho nzMaxTagPlaceholder (số lượng user bị ẩn)
  getMaxTagPlaceholder(omitted: number): string {
    return `+ ${omitted} more`;
  }

  // Copy API Key (chỉ dùng khi edit)
  copyApiKey(key: string): void {
    if (!key) {
      this.message.error('Không có API Key để copy');
      return;
    }
    navigator.clipboard.writeText(key)
      .then(() => this.message.success('API Key đã copy vào clipboard!'))
      .catch(() => this.message.error('Copy thất bại'));
  }

  // Refresh API Key (placeholder - bạn gắn API thật sau)
  refreshApiKey(): void {
    this.message.info('Đang yêu cầu tạo API Key mới...');
    // Gọi API refresh ở đây
    // this.tenantService.refreshApiKey(this.formGroup()?.value.id).subscribe(...)
    setTimeout(() => {
      this.message.success('API Key mới đã được tạo (demo)');
      // Update form nếu cần: this.formGroup()?.patchValue({ apiKey: 'new_key' });
    }, 1500);
  }

  maskApiKey(key: string | null | undefined): string {
    if (!key || key.trim() === '') {
      return 'N/A';
    }
    const trimmed = key.trim();
    if (trimmed.length <= 12) {
      return trimmed;
    }
    return trimmed.slice(0, 8) + '...' + trimmed.slice(-4);
  }
}
