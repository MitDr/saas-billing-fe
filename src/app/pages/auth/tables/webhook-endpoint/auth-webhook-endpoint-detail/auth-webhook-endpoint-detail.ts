import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthWebhookEndpoint} from '../../../../../core/interface/entity/auth/auth-webhook-endpoint';
import {AuthWebhookEndpointService} from '../../../../../core/service/auth/auth-webhook-endpoint-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  WebhookEndpointCard
} from '../../../../../shell/components/card/webhook-endpoint/webhook-endpoint-card/webhook-endpoint-card';
import {
  AuthWebhookEndpointCard
} from '../../../../../shell/components/card/auth/auth-webhook-endpoint-card/auth-webhook-endpoint-card';

@Component({
  selector: 'app-auth-webhook-endpoint-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    WebhookEndpointCard,
    AuthWebhookEndpointCard
  ],
  templateUrl: './auth-webhook-endpoint-detail.html',
  styleUrl: './auth-webhook-endpoint-detail.css',
})
export class AuthWebhookEndpointDetail {
  loading = signal(false);
  webhookEndpoint = signal<AuthWebhookEndpoint | null>(null);
  webhookEndpointService = inject(AuthWebhookEndpointService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadWebhookEndpoint(+id)
      }
    });
  }


  loadWebhookEndpoint(id: number) {
    this.loading.set(true);
    this.webhookEndpointService.getWebhookEndpoint(id).subscribe({
      next: (response) => {
        this.webhookEndpoint.set(response);
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
    this.webhookEndpointService.deleteWebhookEndpoint(id).subscribe({
      next: (response) => {
        this.message.success('feature deleted successfully');
        this.router.navigate(['/app/tables/webhook-endpoints'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
