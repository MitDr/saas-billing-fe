import {Component, input} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {RevenueSummary} from '../../../../core/interface/response/statistic/revenue-summary';

@Component({
  selector: 'app-revenue-summary-carousel',
  imports: [
    NzIconDirective,
    NzSpinComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzCardComponent,
    NzStatisticComponent
  ],
  templateUrl: './revenue-summary-carousel.html',
  styleUrl: './revenue-summary-carousel.css',
})
export class RevenueSummaryCarousel {
  revenueSummary = input.required<RevenueSummary>();
  loading = input<boolean>(false);
}
