import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {
  WEBHOOK_ENDPOINT_ROUTE_CONSTANT
} from '../../../../../core/constant/webhook-endpoint/webhook-endpoint-list-constant';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {WebhookEndpointService} from '../../../../../core/service/webhook-endpoint-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  WebhookEndpointReuseForm
} from '../../../../../shell/components/form/admin/webhook-endpoint-reuse-form/webhook-endpoint-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-webhook-endpoint-create',
  imports: [
    Breadcrumb,
    WebhookEndpointReuseForm,
    NzModalModule,
  ],
  templateUrl: './webhook-endpoint-create.html',
  styleUrl: './webhook-endpoint-create.css',
})
export class WebhookEndpointCreate implements OnInit{
  availableTenant = signal<Tenant[]>([]);
  route = WEBHOOK_ENDPOINT_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  tenantService = inject(TenantService);
  webhookEndpointService = inject(WebhookEndpointService)
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  webhookEndpointForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DISABLED')]],
    url: ['', [Validators.required]],
    tenantId: [null, [Validators.required]],
  })
  ngOnInit(): void {
    this.loadAllTenant()
  }

  loadAllTenant() {
    this.tenantService.getAllTenants().subscribe({
      next: (response) => {
        const tenants = response.content || [];
        this.availableTenant.set(tenants);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  onSubmitted() {
    console.log(this.webhookEndpointForm.value)

    if (this.webhookEndpointForm.valid) {
      this.isSubmitting = true;
      // const payload: FeatureRequest = {
      //   code: this.featureForm.value.code!,
      //   name: this.featureForm.value.name!,
      //   status: this.featureForm.value.status as 'ACTIVE' | 'INACTIVE',
      //   tenantId: this.featureForm.value.tenantId!
      // }
      //
      // if (this.featureForm.value.description) {
      //   const description = this.featureForm.value.description as string;
      //   Object.assign(payload, {description})
      // }
      // const plans = this.featureForm.value.plans! as number[];
      // if (plans?.length) {
      //   Object.assign(payload, {plans});
      // }
      // console.log(payload)
      // this.featureService.createFeature(payload).subscribe({
      //   next: (response) => {
      //     this.isSubmitting = false;
      //     this.message.success('Tạo tenant thành công');
      //     this.featureForm.reset();
      //     this.router.navigate(['/admin/tables/features']);
      //   },
      //   error: (err) => {
      //     this.isSubmitting = false;
      //     console.error('Create feature failed:', err);
      //     this.message.error('Tạo feature thất bại');
      //   }
      // })
    }
  }
}
