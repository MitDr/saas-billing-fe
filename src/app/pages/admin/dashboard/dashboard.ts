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
import {MrrResponse} from '../../../core/interface/response/statistic/mmr-response';
import {MrrChart} from '../../../shell/components/chart/mrr-chart/mrr-chart';
import {NgxEchartsDirective, NgxEchartsModule} from 'ngx-echarts';
import {TopTenantTable} from '../../../shell/components/table/top-tenant-table/top-tenant-table';
import {TopTenantResponse} from '../../../core/interface/response/statistic/top-tenant-response';
import {SuccessRateResponse} from '../../../core/interface/response/statistic/success-rate-response';
import {SuccessRateCarousel} from '../../../shell/components/carousel/success-rate-carousel/success-rate-carousel';

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
    SuccessRateCarousel
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
  invoiceSuccessRate = signal<SuccessRateResponse |null>(null);
  load = signal(false);

  constructor() {
    this.load.set(true)
  }

  ngOnInit(): void {
    // this.getSystemSummary()
    // this.getRevenueSummary()
    // this.getSubscriptionSummary()
    this.getMrrRevenues(12)
    this.getTopTenant(10)
    this.getInvoiceSuccessRate();
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


  // private getSubscriptionSummary() {
  //   this.statisticService.getSubscriptionSummary().subscribe({
  //     next: (res) => {
  //       this.subscriptionSummary.set(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }
  private getMrrRevenues(month: number) {
    // this.statisticService.getSubscriptionSummary().subscribe({
    //   next: (res) => {
    //     this.subscriptionSummary.set(res);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
    const mockData: MrrResponse[] = [
      { month: "2026-01", mrr: "390.00" },
      { month: "2025-12", mrr: "387.00" },
      { month: "2025-11", mrr: "305.00" },
      { month: "2025-10", mrr: "14.00" },
      { month: "2025-09", mrr: "0.00" },
      { month: "2025-08", mrr: "0.00" },
      { month: "2025-07", mrr: "0.00" },
      { month: "2025-06", mrr: "0.00" },
      { month: "2025-05", mrr: "0.00" },
      { month: "2025-04", mrr: "0.00" },
      { month: "2025-03", mrr: "0.00" },
      { month: "2025-02", mrr: "0.00" }
    ];
    this.mrrRevenue.set(mockData);
  }

  private getTopTenant(num: number){
    const mockData: TopTenantResponse[] = [
      {
        "id": 2,
        "name": "Long3's tenant",
        "email": "ttlong13013@gmail.com",
        "totalRevenue": 10347
      },
      {
        "id": 3,
        "name": "Long4's tenant",
        "email": "ttlong13014@gmail.com",
        "totalRevenue": 0
      }
    ]

    this.topTenants.set(mockData);
  }

  private getInvoiceSuccessRate(){
    const mockData: SuccessRateResponse = {
      "paid": 34,
      "unpaid": 0,
      "draft": 0,
      "successRate": 100
    }

    this.invoiceSuccessRate.set(mockData)
  }
}
