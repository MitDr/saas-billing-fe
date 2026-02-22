import {Component, inject, OnInit, signal} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {RouterLink} from '@angular/router';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {StatisticCard} from '../../../shell/components/card/statistic/statistic-card/statistic-card';
import {StatisticService} from '../../../core/service/statistic-service';
import {SystemSummary} from '../../../core/interface/response/statistic/system-summary';
import {
  SystemSummaryCarousel
} from '../../../shell/components/carousel/system-summary-carousel/system-summary-carousel';
import {RevenueSummary} from '../../../core/interface/response/statistic/revenue-summary';
import {
  RevenueSummaryCarousel
} from '../../../shell/components/carousel/revenue-summary-carousel/revenue-summary-carousel';
import {
  SubscriptionOvervieCarousel
} from '../../../shell/components/carousel/subscription-overvie-carousel/subscription-overvie-carousel';
import {SubscriptionSummary} from '../../../core/interface/response/statistic/subscription-overview';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzCardComponent,
    NzPageHeaderComponent,
    NzBreadCrumbItemComponent,
    RouterLink,
    NzSpinComponent,
    StatisticCard,
    SystemSummaryCarousel,
    RevenueSummaryCarousel,
    SubscriptionOvervieCarousel
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  statisticService = inject(StatisticService);
  systemSummary = signal<SystemSummary | null>(null);
  revenueSummary = signal<RevenueSummary | null>(null);
  subscriptionSummary = signal<SubscriptionSummary | null>(null);
  load = signal(false);

  constructor() {
    this.load.set(true)
  }

  ngOnInit(): void {
    this.getSystemSummary()
    this.getRevenueSummary()
    this.getSubscriptionSummary()
    this.load.set(false)
  }

  getSystemSummary() {
    this.statisticService.getSystemSummary().subscribe({
      next: (res) => {
        this.systemSummary.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getRevenueSummary() {
    this.statisticService.getRevenueSummary().subscribe({
      next: (res) => {
        this.revenueSummary.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  private getSubscriptionSummary() {
    this.statisticService.getSubscriptionSummary().subscribe({
      next: (res) => {
        this.subscriptionSummary.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
