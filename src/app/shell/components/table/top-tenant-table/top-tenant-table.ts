import { Component, input } from '@angular/core';
import {TopTenantResponse} from '../../../../core/interface/response/statistic/top-tenant-response';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-top-tenant-table',
  imports: [
    NzSpinComponent,
    NzTableComponent,
    CurrencyPipe
  ],
  templateUrl: './top-tenant-table.html',
  styleUrl: './top-tenant-table.css',
})
export class TopTenantTable {
  data = input.required<TopTenantResponse[]>();
  loading = input<boolean>(false);
}
