import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthWebhookLog} from '../../../../../core/interface/entity/auth/auth-webhook-log';
import {AuthWebhookLogService} from '../../../../../core/service/auth/auth-webhook-log-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {WebhookLogCard} from '../../../../../shell/components/card/webhook-log/webhook-log-card/webhook-log-card';
import {
  AuthWebhookLogCard
} from '../../../../../shell/components/card/auth/auth-webhook-log-card/auth-webhook-log-card';

@Component({
  selector: 'app-auth-webhook-log-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    WebhookLogCard,
    AuthWebhookLogCard
  ],
  templateUrl: './auth-webhook-log-detail.html',
  styleUrl: './auth-webhook-log-detail.css',
})
export class AuthWebhookLogDetail {
  loading = signal(false);
  webhookLog = signal<AuthWebhookLog | null>(null);
  webhookLogService = inject(AuthWebhookLogService);
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
        this.router.navigate(['/app/tables/webhook-logs'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
