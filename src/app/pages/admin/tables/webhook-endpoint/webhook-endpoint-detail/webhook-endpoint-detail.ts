import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WebhookEndpoint} from '../../../../../core/interface/entity/webhook-endpoint';
import {WebhookEndpointService} from '../../../../../core/service/webhook-endpoint-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  WebhookEndpointCard
} from '../../../../../shell/components/card/webhook-endpoint/webhook-endpoint-card/webhook-endpoint-card';

@Component({
  selector: 'app-webhook-endpoint-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    WebhookEndpointCard
  ],
  templateUrl: './webhook-endpoint-detail.html',
  styleUrl: './webhook-endpoint-detail.css',
})
export class WebhookEndpointDetail {
  loading = signal(false);
  webhookEndpoint = signal<WebhookEndpoint | null>(null);
  webhookEndpointService = inject(WebhookEndpointService);
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
        this.router.navigate(['/admin/tables/webhook-endpoints'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
