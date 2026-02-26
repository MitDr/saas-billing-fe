import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {
  WEBHOOK_ENDPOINT_ROUTE_CONSTANT
} from '../../../../../core/constant/webhook-endpoint/webhook-endpoint-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {WebhookEndpointService} from '../../../../../core/service/webhook-endpoint-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Feature} from '../../../../../core/interface/entity/feature';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {WebhookEndpoint} from '../../../../../core/interface/entity/webhook-endpoint';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  WebhookEndpointReuseForm
} from '../../../../../shell/components/form/admin/webhook-endpoint-reuse-form/webhook-endpoint-reuse-form';

@Component({
  selector: 'app-webhook-endpoint-edit',
  imports: [
    NzModalModule,
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    WebhookEndpointReuseForm,
  ],
  templateUrl: './webhook-endpoint-edit.html',
  styleUrl: './webhook-endpoint-edit.css',
})
export class WebhookEndpointEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  routing = WEBHOOK_ENDPOINT_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  webhookEndpointService = inject(WebhookEndpointService)
  message = inject(NzMessageService);
  initTenant = signal<Tenant | null>(null);
  webhookEndpoint = signal<WebhookEndpoint | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  webhookEndpointForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DISABLED')]],
    url: ['', [Validators.required]],
    tenantId: [null as number | null, [Validators.required]],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadWebhookEndpoint(+id);
      }
    });
    effect(() => {
      const currentEndpoint = this.webhookEndpoint();
      if (currentEndpoint) {
        this.webhookEndpointForm.patchValue({
          status: currentEndpoint.status,
          url: currentEndpoint.url,
          tenantId: currentEndpoint.tenant?.id
        });
        this.getTenant(currentEndpoint?.tenant.id!);
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

  ngOnInit(): void {
    this.loadAllTenant();
  }

  loadAllTenant() {
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
      }
    });
  }

  onSubmitted() {
    if (this.webhookEndpointForm.valid) {

    }
  }
}
