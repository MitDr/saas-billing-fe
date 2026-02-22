import {Component, input} from '@angular/core';
import {SubscriptionSummary} from '../../../../core/interface/response/statistic/subscription-overview';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-subscription-overvie-carousel',
  imports: [
    NzSpinComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NzCardComponent,
    NzStatisticComponent,
    NzIconDirective
  ],
  templateUrl: './subscription-overvie-carousel.html',
  styleUrl: './subscription-overvie-carousel.css',
})
export class SubscriptionOvervieCarousel {
  overview = input.required<SubscriptionSummary>(); // { totalTenants, totalSubscribers, ... }
  loading = input<boolean>(false);
}
