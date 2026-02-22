import {Component, input} from '@angular/core';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzInputPrefixDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-statistic-card',
  imports: [
    NzCardComponent,
    NzStatisticComponent,
    NzIconDirective,
    NzTagComponent,
    NzInputPrefixDirective
  ],
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.css',
})
export class StatisticCard {
// Inputs
  title = input.required<string>();
  value = input.required<number | string>();
  prefix = input<string>('');
  suffix = input<string>('');
  prefixIcon = input<string>(''); // icon nz-icon, ví dụ 'team', 'dollar'

  // Trend (tăng/giảm)
  trend = input<'up' | 'down' | null>(null);
  trendValue = input<number>(0);
  trendColor = input<'green' | 'red' | null>(null); // optional, mặc định nz-trend tự xử lý
}
