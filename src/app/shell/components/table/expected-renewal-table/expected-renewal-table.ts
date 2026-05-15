import {Component, computed, input, signal} from '@angular/core';
import {ExpectedRenewal} from '../../../../core/interface/response/statistic/expected-renewal';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {CurrencyPipe, DatePipe, formatDate} from '@angular/common';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-expected-renewal-table',
  imports: [
    NzCardComponent,
    NzSpinComponent,
    NzStatisticComponent,
    NzIconDirective,
    NzTableComponent,
    DatePipe,
    CurrencyPipe,
    NzTagComponent,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './expected-renewal-table.html',
  styleUrl: './expected-renewal-table.css',
})
export class ExpectedRenewalTable {
  data = input.required<ExpectedRenewal[]>();
  loading = input<boolean>(false);
  num = input.required<number>();


  // Phân trang client-side
  pageIndex = signal(1);
  pageSize = signal(5);

  // Dữ liệu hiển thị theo trang
  tableData = computed(() => {
    const start = (this.pageIndex() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.data().slice(start, end);
  });

  // Tổng số dòng
  total = computed(() => this.data().length);

  // Tổng amount
  totalAmount = computed(() => {
    return this.data().reduce((sum, item) => {
      const amountInUsd = (item.expectedAmountUsd || 0) / 100;
      return sum + amountInUsd;
    }, 0);
  });

  formattedTotalAmount = computed(() => {
    return this.totalAmount().toFixed(2);
  });

  // Sự kiện thay đổi page
  onPageIndexChange(index: number) {
    this.pageIndex.set(index);
  }

  // Sự kiện thay đổi size
  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.pageIndex.set(1);
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
}
