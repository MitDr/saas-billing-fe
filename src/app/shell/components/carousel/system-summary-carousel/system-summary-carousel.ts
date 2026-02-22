import {Component, input} from '@angular/core';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzCarouselComponent, NzCarouselContentDirective, NzCarouselModule} from 'ng-zorro-antd/carousel';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {SystemSummary} from '../../../../core/interface/response/statistic/system-summary';

@Component({
  selector: 'app-system-summary-carousel',
  imports: [
    NzSpinComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzCardComponent,
    NzStatisticComponent,
    NzIconDirective,
    NzCarouselModule
  ],
  templateUrl: './system-summary-carousel.html',
  styleUrl: './system-summary-carousel.css',
})
export class SystemSummaryCarousel {
  systemSummary = input.required<SystemSummary>(); // { totalTenants, totalSubscribers, ... }
  loading = input<boolean>(false);
}
