import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookLog} from '../../../../../core/interface/entity/webhook-log';
import {WebhookLogService} from '../../../../../core/service/webhook-log-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {WebhookLogCard} from '../../../../../shell/components/card/webhook-log/webhook-log-card/webhook-log-card';

@Component({
  selector: 'app-webhook-log-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    WebhookLogCard
  ],
  templateUrl: './webhook-log-detail.html',
  styleUrl: './webhook-log-detail.css',
})
export class WebhookLogDetail {
  loading = signal(false);
  webhookLog = signal<WebhookLog | null>(null);
  webhookLogService = inject(WebhookLogService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadWebhookLog(+id)
      }
    });
  }


  loadWebhookLog(id: number) {
    this.loading.set(true);
    this.webhookLogService.getWebhookLog(id).subscribe({
      next: (response) => {
        this.webhookLog.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onDelete(id: number) {
    // console.log(id);
    this.loading.set(true);
    this.webhookLogService.deleteWebhookLog(id).subscribe({
      next: (response) => {
        this.message.success('feature deleted successfully');
        this.router.navigate(['/admin/tables/webhook-logs'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
