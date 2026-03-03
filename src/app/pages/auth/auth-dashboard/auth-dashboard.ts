import {Component, effect, inject, signal} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {RouterModule} from '@angular/router';
import {StatisticService} from '../../../core/service/statistic-service';
import {AuthStatisticService} from '../../../core/service/auth-statistic-service';
import {RevenueSummary} from '../../../core/interface/response/statistic/revenue-summary';
import {SubscriptionSummary} from '../../../core/interface/response/statistic/subscription-overview';
import {MrrResponse} from '../../../core/interface/response/statistic/mmr-response';
import {SuccessRateResponse} from '../../../core/interface/response/statistic/success-rate-response';
import {ChurnRateResponse} from '../../../core/interface/response/statistic/churn-rate-response';
import {ExpectedRenewal} from '../../../core/interface/response/statistic/expected-renewal';
import {PRICE_ROUTE_CONSTANT} from '../../../core/constant/price/price-list-constant';
import {ChurnRateChart} from '../../../shell/components/chart/churn-rate-chart/churn-rate-chart';
import {ExpectedRenewalTable} from '../../../shell/components/table/expected-renewal-table/expected-renewal-table';
import {MrrChart} from '../../../shell/components/chart/mrr-chart/mrr-chart';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {
  RevenueSummaryCarousel
} from '../../../shell/components/carousel/revenue-summary-carousel/revenue-summary-carousel';
import {
  SubscriptionOvervieCarousel
} from '../../../shell/components/carousel/subscription-overvie-carousel/subscription-overvie-carousel';
import {SuccessRateCarousel} from '../../../shell/components/carousel/success-rate-carousel/success-rate-carousel';
import {
  SystemSummaryCarousel
} from '../../../shell/components/carousel/system-summary-carousel/system-summary-carousel';
import {TopTenantTable} from '../../../shell/components/table/top-tenant-table/top-tenant-table';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth-dashboard',
  imports: [
    RouterModule,
    NzCardComponent,
    ChurnRateChart,
    ExpectedRenewalTable,
    MrrChart,
    NzInputNumberComponent,
    NzOptionComponent,
    NzPageHeaderComponent,
    NzSelectComponent,
    RevenueSummaryCarousel,
    SubscriptionOvervieCarousel,
    SuccessRateCarousel,
    SystemSummaryCarousel,
    TopTenantTable,
    FormsModule
  ],
  templateUrl: './auth-dashboard.html',
  styleUrl: './auth-dashboard.css',
})
export class AuthDashboard {
  statisticService = inject(AuthStatisticService);
  revenueSummary = signal<RevenueSummary | null>(null);
  subscriptionSummary = signal<SubscriptionSummary | null>(null);
  mrrRevenue = signal<MrrResponse[]>([]);
  invoiceSuccessRate = signal<SuccessRateResponse | null>(null);
  churnRate = signal<ChurnRateResponse | null>(null);
  expectedRenewals = signal<ExpectedRenewal[]>([]);

  mrrMonths = signal(12);
  churnPeriod = signal(12);
  renewalDays = signal(30);

  load = signal(false);

  constructor() {
    effect(() => {
      this.mrrMonths(); // theo dõi thay đổi
      this.loadMrr();
    });

    effect(() => {
      this.churnPeriod();
      this.loadChurn();
    });


    effect(() => {
      this.renewalDays();
      this.loadExpectedRenewal();
    });

    effect(() => {
      this.load.set(true)
      this.getRevenueSummary()
      this.getSubscriptionSummary()
      this.getInvoiceSuccessRate();
      this.load.set(false)
    });
  }

  loadMrr() {
    this.getMrrRevenues(this.mrrMonths());
  }

  loadChurn() {
    this.getChurnRate(this.churnPeriod());
  }

  loadExpectedRenewal() {
    this.getExpectedRenewal(this.renewalDays());
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

  // }
  private getMrrRevenues(month: number) {
    if (month < 1 || !month) return;
    this.statisticService.getMrrRevenues(month).subscribe({
      next: (res) => {
        this.mrrRevenue.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private getInvoiceSuccessRate() {
    this.statisticService.getSuccessRate().subscribe({
      next: (res) => {
        this.invoiceSuccessRate.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private getChurnRate(num: number) {
    if (num < 1 || !num) return;
    this.statisticService.getChurnRate(num).subscribe({
      next: (res) => {
        this.churnRate.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private getExpectedRenewal(days: number) {
    if (days < 1 || !days) return;
    this.statisticService.getUpcomingRenewal(days).subscribe({
      next: (res) => {
        this.expectedRenewals.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
