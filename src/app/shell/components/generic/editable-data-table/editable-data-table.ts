import {Component, computed, effect, input, output, signal} from '@angular/core';
import {ColumnConfig} from '../../../../core/interface/column-config';
import {RowAction} from '../../../../core/interface/row-action';
import {NzTableComponent, NzTdAddOnComponent, NzThSelectionComponent} from 'ng-zorro-antd/table';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NgTemplateOutlet} from '@angular/common';
import {Breadcrumb} from '../breadcrumb/breadcrumb';
import {BreadCrumbInterface} from '../../../../core/interface/bread-crumb-interface';
import {RouterLink} from '@angular/router';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {ListData} from '../../../../core/interface/list-data';

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
  routes = input<BreadCrumbInterface[]>();
  viewRoute = input.required<string>();

  pageChange = output<number>();
  sizeChange = output<number>();

  // Computed lấy mảng thật
  tableData = computed(() => this.data()?.content ?? []);

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

  // State
  editCache = signal<Record<string | number, { edit: boolean; data: T }>>({});
  checked = signal(false);
  indeterminate = signal(false);
  setOfCheckedId = signal<Set<number>>(new Set());

  // Computed
  allChecked = computed(() => this.data()?.content.every(item => this.setOfCheckedId().has(item.id)));
  someChecked = computed(() => this.data()?.content.some(item => this.setOfCheckedId().has(item.id)) && !this.allChecked());

  editing = computed(() => Object.values(this.editCache()).some(c => c.edit));

  constructor() {
    // Tự động rebuild editCache khi data thay đổi
    effect(() => {
      const data = this.data();
      const cache: any = {};
      data?.content.forEach(item => {
        cache[item.id] = {edit: false, data: {...item}};
      });
      this.editCache.set(cache);
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
    this.saveRow.emit(editedRow as T);  // ← emit ra ngoài
  }

  onBulkDelete(): void {
    this.bulkDelete.emit(Array.from(this.setOfCheckedId()));
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, k) => (o || {})[k], obj);
  }

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

}
