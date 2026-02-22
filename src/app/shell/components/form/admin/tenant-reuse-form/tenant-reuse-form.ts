import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
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
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {User} from '../../../../../core/interface/entity/user';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {TenantService} from '../../../../../core/service/tenant-service';

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
    NzTooltipDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzCheckboxComponent,
    NzModalComponent,
    NzModalContentDirective,
  ],
  templateUrl: './tenant-reuse-form.html',
  styleUrl: './tenant-reuse-form.css',
})

export class TenantReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Tenant');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  // Danh sách user có sẵn (truyền từ parent)
  availableUsers = input<User[]>([]);
  apiKey = input<string>();
  selectedCreator = signal<User | null>(null);
  selectedUsers = signal<User[]>([]);
  initCreator = input<User | null>();
  initUsers = input<User[] | null>();
  // Signals quản lý lựa chọn
  tenantService = inject(TenantService)
  // Modal visibility
  isCreatorModalOpen = signal(false);
  isUsersModalOpen = signal(false);
  refreshAPI = output<void>();
  apiKeyValue = computed(() => this.apiKey() ?? '');
  maskedApiKey = computed(() => this.maskApiKey(this.apiKeyValue()));
  // Trong TenantReuseForm component
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedUsers.set(this.initUsers() || []);
      this.selectedCreator.set(this.initCreator() || null);
    });
  }

  // Getter controls
  get name() {
    return this.formGroup()?.get('name');
  }

  get email() {
    return this.formGroup()?.get('email');
  }

  get creatorId() {
    return this.formGroup()?.get('creatorId');
  }

  get users() {
    return this.formGroup()?.get('users');
  }

  get currentAmount() {
    return this.formGroup()?.get('currentAmount');
  }

  get pendingAmount() {
    return this.formGroup()?.get('pendingAmount');
  }

  get apiKeyControl() {
    return this.formGroup()?.get('apiKey');
  }

  // Mở modal Creator
  openCreatorModal() {
    this.isCreatorModalOpen.set(true);
  }

  // Chọn Creator (single)
  selectCreator(user: User) {
    this.selectedCreator.set(user);
    this.creatorId?.setValue(user.id);
    this.isCreatorModalOpen.set(false);
  }

  // Clear Creator
  clearCreator() {
    this.selectedCreator.set(null);
    this.creatorId?.setValue(null);
  }

  // Mở modal Assign Users
  openUsersModal() {
    this.isUsersModalOpen.set(true);
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUsers().some(u => u.id === userId);
  }

  // Toggle user trong multi-select
  toggleUser(user: User) {
    const current = this.selectedUsers();
    if (current.some(u => u.id === user.id)) {
      this.selectedUsers.set(current.filter(u => u.id !== user.id));
    } else {
      this.selectedUsers.set([...current, user]);
    }
    // Sync IDs vào form control
    this.users?.setValue(this.selectedUsers().map(u => u.id));
  }

  // Xóa user đã chọn từ preview
  removeSelectedUser(userId: number) {
    this.selectedUsers.set(this.selectedUsers().filter(u => u.id !== userId));
    this.users?.setValue(this.selectedUsers().map(u => u.id));
  }

  maskApiKey(key: string): string {
    if (!key || key.trim() === '') return 'N/A';
    const trimmed = key.trim();
    if (trimmed.length <= 12) return trimmed;
    return trimmed.slice(0, 8) + '...' + trimmed.slice(-4);
  }

  copyApiKey(key: string): void {
    if (!key) {
      this.message.error('Không có API Key để copy');
      return;
    }
    navigator.clipboard.writeText(key)
      .then(() => this.message.success('API Key đã copy!'))
      .catch(() => this.message.error('Copy thất bại'));
  }

  refreshApiKey(): void {
    this.refreshAPI.emit()
  }

  getMaxTagPlaceholder(omitted: number): string {
    return `+ ${omitted} more`;
  }

  onSubmit(): void {
    const form = this.formGroup();
    if (form?.valid) {
      this.submitted.emit();
    } else {
      Object.values(form?.controls || {}).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      this.message.warning('Vui lòng kiểm tra lại thông tin!');
    }
  }
}
