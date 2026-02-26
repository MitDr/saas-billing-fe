import {Component, inject, OnInit, signal} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzPageHeaderBreadcrumbDirective, NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
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
import {MrrResponse} from '../../../core/interface/response/statistic/mmr-response';
import {MrrChart} from '../../../shell/components/chart/mrr-chart/mrr-chart';
import {NgxEchartsModule} from 'ngx-echarts';
import {TopTenantTable} from '../../../shell/components/table/top-tenant-table/top-tenant-table';
import {TopTenantResponse} from '../../../core/interface/response/statistic/top-tenant-response';
import {SuccessRateResponse} from '../../../core/interface/response/statistic/success-rate-response';
import {SuccessRateCarousel} from '../../../shell/components/carousel/success-rate-carousel/success-rate-carousel';
import {Breadcrumb} from '../../../shell/components/generic/breadcrumb/breadcrumb';
import {PRICE_ROUTE_CONSTANT} from '../../../core/constant/price/price-list-constant';
import {SuccessRateCard} from '../../../shell/components/card/statistic/success-rate-card/success-rate-card';
import {ChurnRateResponse} from '../../../core/interface/response/statistic/churn-rate-response';
import {ChurnRateChart} from '../../../shell/components/chart/churn-rate-chart/churn-rate-chart';
import {ExpectedRenewalTable} from '../../../shell/components/table/expected-renewal-table/expected-renewal-table';
import {ExpectedRenewal} from '../../../core/interface/response/statistic/expected-renewal';

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
    SubscriptionOvervieCarousel,
    MrrChart,
    NgxEchartsModule,
    TopTenantTable,
    SuccessRateCarousel,
    Breadcrumb,
    NzBreadCrumbComponent,
    NzPageHeaderBreadcrumbDirective,
    SuccessRateCard,
    ChurnRateChart,
    ExpectedRenewalTable
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  statisticService = inject(StatisticService);
  systemSummary = signal<SystemSummary | null>(null);
  revenueSummary = signal<RevenueSummary | null>(null);
  subscriptionSummary = signal<SubscriptionSummary | null>(null);
  mrrRevenue = signal<MrrResponse[]>([]);
  topTenants = signal<TopTenantResponse[]>([]);
  invoiceSuccessRate = signal<SuccessRateResponse | null>(null);
  churnRate = signal<ChurnRateResponse | null>(null);
  expectedRenewals = signal<ExpectedRenewal[]>([]);
  load = signal(false);
  protected readonly routing = PRICE_ROUTE_CONSTANT;

  constructor() {
    this.load.set(true)
  }

  ngOnInit(): void {
    // this.getSystemSummary()
    // this.getRevenueSummary()
    // this.getSubscriptionSummary()
    // this.getMrrRevenues(12)
    // this.getTopTenant(10)
    // this.getInvoiceSuccessRate();
    // this.getChurnRate(12);
    this.getExpectedRenewal();
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

  // }
  private getMrrRevenues(month: number) {
    this.statisticService.getMrrRevenues(month).subscribe({
      next: (res) => {
        this.mrrRevenue.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private getTopTenant(num: number) {
    this.statisticService.getTopTenant(num).subscribe({
      next: (res) => {
        this.topTenants.set(res);
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
    this.statisticService.getChurnRate(num).subscribe({
      next: (res) => {
        this.churnRate.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private getExpectedRenewal(){
    const mockData: ExpectedRenewal[] = [
      {
        subscriptionId: 101,
        subscriberId: 5,
        subscriberName: "Nguyễn Văn A",
        planName: "Pro Plan",
        renewalDate: "2026-02-15T00:00:00",
        expectedAmountUsd: 99,
        autoRenew: true
      },
      {
        subscriptionId: 102,
        subscriberId: 7,
        subscriberName: "Trần Thị B",
        planName: "Enterprise",
        renewalDate: "2026-02-20T00:00:00",
        expectedAmountUsd: 299,
        autoRenew: false
      },
      {
        subscriptionId: 103,
        subscriberId: 2,
        subscriberName: "Lê Văn C",
        planName: "Basic",
        renewalDate: "2026-03-01T00:00:00",
        expectedAmountUsd: 29,
        autoRenew: true
      },
      {
        subscriptionId: 104,
        subscriberId: 9,
        subscriberName: "Phạm Thị D",
        planName: "Pro Plan",
        renewalDate: "2026-03-05T00:00:00",
        expectedAmountUsd: 99,
        autoRenew: true
      },
      {
        subscriptionId: 105,
        subscriberId: 11,
        subscriberName: "Hoàng Văn E",
        planName: "Enterprise",
        renewalDate: "2026-03-10T00:00:00",
        expectedAmountUsd: 299,
        autoRenew: false
      },
      {
        subscriptionId: 106,
        subscriberId: 13,
        subscriberName: "Vũ Thị F",
        planName: "Basic",
        renewalDate: "2026-03-15T00:00:00",
        expectedAmountUsd: 29,
        autoRenew: true
      }
    ]

    this.expectedRenewals.set(mockData)
  }
}
