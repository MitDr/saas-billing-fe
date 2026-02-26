import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {ColumnConfig} from '../../../../core/interface/column-config';
import {RowAction} from '../../../../core/interface/row-action';
import {NzTableComponent, NzTdAddOnComponent, NzThSelectionComponent} from 'ng-zorro-antd/table';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {DatePipe, formatDate, NgTemplateOutlet} from '@angular/common';
import {Breadcrumb} from '../breadcrumb/breadcrumb';
import {BreadCrumbInterface} from '../../../../core/interface/bread-crumb-interface';
import {RouterLink} from '@angular/router';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {ListData} from '../../../../core/interface/list-data';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzTimePickerComponent} from 'ng-zorro-antd/time-picker';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {SoftDeleteRequest} from '../../../../core/interface/request/soft-delete-request';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';

@Component({
  selector: ' app-editable-data-table',
  imports: [
    NzTableComponent,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzTagComponent,
    NzPopconfirmDirective,
    NzInputDirective,
    NzButtonComponent,
    NgTemplateOutlet,
    NzThSelectionComponent,
    NzTdAddOnComponent,
    Breadcrumb,
    RouterLink,
    NzAvatarComponent,
    NzDatePickerComponent,
    NzTimePickerComponent,
    NzModalModule,
    DatePipe,
    NzIconDirective,
    NzCardComponent,
    NzCheckboxComponent,
    NzCardMetaComponent
  ],
  templateUrl: './editable-data-table.html',
  styleUrl: './editable-data-table.css',
})
export class EditableDataTable<T extends { id: number }> {
  // Inputs
  data = input.required<ListData<T> | null>();
  columns = input.required<ColumnConfig<T>[]>();
  rowActions = input<RowAction<T>[]>([]);
  loading = input<boolean>(false);
  pageSizeOptions = input<number[]>([5, 10, 20, 50, 100]);
  showBulkDelete = input<boolean>(true);
  showSoftDelete = input<boolean>(true);
  routes = input<BreadCrumbInterface[]>();
  viewRoute = input.required<string>();
  entityName = input<string>('thưc thể');
  pageChange = output<number>();
  sizeChange = output<number>();

  // Trong SubscriptionReuseForm (hoặc component table chứa bulk action)
  isBulkDeleteModalOpen = signal(false);
  selectedBulkSoftDeleteMode = signal<boolean | null>(null); // null = chưa chọn, true = xóa mềm, false = khôi phục
  editable = input<boolean>(true);
  // Computed lấy mảng thật
  tableData = computed(() => this.data()?.content ?? []);
  isVisible = false;
  // Tổng số record
  totalItems = computed(() => this.data()?.totalElements ?? 0);
  // Trang hiện tại (nz-table dùng 1-based)
  currentPage = computed(() => this.data()?.page ?? 1);
  // Size hiện tại
  currentSize = computed(() => this.data()?.size ?? 5);
  // Outputs
  saveRow = output<T>();
  // deleteRow = output<T>();
  bulkDelete = output<number[]>();
  bulkSoftDelete = output<SoftDeleteRequest>();
  // State
  editCache = signal<Record<string | number, { edit: boolean; data: T }>>({});
  checked = signal(false);
  indeterminate = signal(false);
  setOfCheckedId = signal<Set<number>>(new Set());
  // Computed
  allChecked = computed(() => this.data()?.content.every(item => this.setOfCheckedId().has(item.id)));
  someChecked = computed(() => this.data()?.content.some(item => this.setOfCheckedId().has(item.id)) && !this.allChecked());
  editing = computed(() => Object.values(this.editCache()).some(c => c.edit));
  modalService = inject(NzModalService);
  protected readonly Date = Date;

  constructor() {
    effect(() => {
      const data = this.data();
      const cache: any = {};
      data?.content.forEach(item => {
        cache[item.id] = {edit: false, data: {...item}};
      });
      this.editCache.set(cache);

      console.log(this.data())
    });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    const set = new Set(this.setOfCheckedId());
    if (checked) {
      set.add(id);
    } else {
      set.delete(id);
    }
    this.setOfCheckedId.set(set);
  }

  onAllChecked(checked: boolean): void {
    const set = new Set<number>();
    if (checked) {
      this.data()?.content.forEach(item => set.add(item.id));
    }
    this.setOfCheckedId.set(set);
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  startEdit(id: number): void {
    const cache = {...this.editCache()};
    cache[id] = {...cache[id], edit: true};
    this.editCache.set(cache);
  }

  cancelEdit(id: number): void {
    const cache = {...this.editCache()};
    const original = this.data()?.content.find(item => item.id === id)!;
    cache[id] = {edit: false, data: {...original}};
    this.editCache.set(cache);
  }

  saveEdit(id: number): void {
    const cache = this.editCache();
    const editedRow = cache[id].data;

    const transformedRow = this.transformDates(editedRow);
    this.saveRow.emit(transformedRow as T);  // ← emit ra ngoài
  }

  // onBulkDelete(): void {
  //   this.bulkDelete.emit(Array.from(this.setOfCheckedId()));
  // }

  // getNestedValue(obj: any, path: string): any {
  //   return path.split('.').reduce((o, k) => (o || {})[k], obj);
  // }

  getNestedValue(obj: any, path?: string): any {
    if (!path) return obj; // Nếu path undefined, trả obj gốc (hoặc item[col.key])
    return path.split('.').reduce((o, k) => (o || {})[k], obj);
  }

  // getNestedValue(obj: any, path: string): any {
  //   return path.split('.').reduce((acc, key) => {
  //     if (acc == null) return undefined;
  //     return acc[key];
  //   }, obj);
  // }

  getOptionLabel(col: ColumnConfig<T>, value: any): string {
    if (!col.options) return value?.toString() || 'N/A';
    const option = col.options.find(opt => opt.value === value);
    return option?.label || value?.toString() || 'N/A';
  }

  getOptionColor(col: ColumnConfig<T>, value: any): string {
    if (!col.options) return 'default';
    const option = col.options.find(opt => opt.value === value);
    return option?.color || 'default';
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa ${this.setOfCheckedId().size} ${this.entityName()} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        // set.delete(id);
        this.bulkDelete.emit(Array.from(this.setOfCheckedId()));
        this.setOfCheckedId.set(new Set);
      }
    });
  }

  softDelete(): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa mềm',
      nzContent: `Xóa ${this.setOfCheckedId().size} ${this.entityName()} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        // set.delete(id);
        const response: SoftDeleteRequest = {
          ids: Array.from(this.setOfCheckedId()),
          softDelete: true
        }
        this.bulkSoftDelete.emit(response);
        this.setOfCheckedId.set(new Set);
      }
    });
  }

  formatDateString(dateStr: unknown, format: string): string {
    if (!dateStr || typeof dateStr !== 'string') return '';

    const [datePart, timePart] = dateStr.split(' ');
    if (!datePart || !timePart) return '';

    const [day, month, year] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );

    return formatDate(date, format, 'en-US');
  }

  formatUuid(uuid: unknown): string {
    if (!uuid || typeof uuid !== 'string') return '';

    if (!uuid) return '';
    return uuid.slice(0, 8) + '...' + uuid.slice(-4);
  }

  openBulkDeleteModal(): void {
    const count = this.setOfCheckedId().size;
    if (count === 0) return;

    this.selectedBulkSoftDeleteMode.set(null); // reset lựa chọn
    this.isBulkDeleteModalOpen.set(true);
  }

  confirmBulkAction(): void {
    const mode = this.selectedBulkSoftDeleteMode();
    if (mode === null) return;

    const ids = Array.from(this.setOfCheckedId());
    const response: SoftDeleteRequest = {
      ids,
      softDelete: mode
    };

    this.bulkSoftDelete.emit(response);
    this.setOfCheckedId.set(new Set());
    this.isBulkDeleteModalOpen.set(false);
    this.selectedBulkSoftDeleteMode.set(null);
  }

  private formatDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} `
      + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  private transformDates(obj: any): any {
    if (obj instanceof Date) {
      return this.formatDate(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.transformDates(item));
    }

    if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = this.transformDates(obj[key]);
      }
      return newObj;
    }

    return obj;
  }
}
