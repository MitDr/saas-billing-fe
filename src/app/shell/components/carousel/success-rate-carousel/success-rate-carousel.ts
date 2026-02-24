import {Component, input} from '@angular/core';
import {SubscriptionSummary} from '../../../../core/interface/response/statistic/subscription-overview';
import {SuccessRateResponse} from '../../../../core/interface/response/statistic/success-rate-response';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-success-rate-carousel',
  imports: [
    NzSpinComponent,
    NzCarouselComponent,
    NzCardComponent,
    NzCarouselContentDirective,
    NzIconDirective,
    NzStatisticComponent
  ],
  templateUrl: './success-rate-carousel.html',
  styleUrl: './success-rate-carousel.css',
})
export class SuccessRateCarousel {
  data = input.required<SuccessRateResponse>(); // { totalTenants, totalSubscribers, ... }
  loading = input<boolean>(false);

  appendPercentage(num: number): string{
    return this.data().successRate + '%';
  }
}
