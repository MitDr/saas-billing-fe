import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {ENTITLEMENT_ROUTE_CONSTANT} from '../../../../../core/constant/entitlement/entitlement-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {EntitlementService} from '../../../../../core/service/entitlement-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {TenantReuseForm} from '../../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FeatureService} from '../../../../../core/service/feature-service';
import {Feature} from '../../../../../core/interface/entity/feature';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {EntitlementRequest} from '../../../../../core/interface/request/entitlement-request';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-entitlement-create',
  imports: [
    Breadcrumb,
    TenantReuseForm,
    NzModalModule,
    EntitlementReuseForm
  ],
  templateUrl: './entitlement-create.html',
  styleUrl: './entitlement-create.css',
})
export class EntitlementCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availableFeature = signal<Feature[]>([]);
  availableSubscription = signal<Subscription[]>([]);
  route = ENTITLEMENT_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  featureService = inject(FeatureService);
  tenantService = inject(TenantService);
  subscriptionService = inject(SubscriptionService);
  entitlementService = inject(EntitlementService)
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  entitlementForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|EXPIRED|REVOKED')]],
    tenantId: [null, [Validators.required]],
    featureId: [null, [Validators.required]],
    subscriptionId: [null, [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    //

  })

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllFeature();
    this.loadAllSubscription()
  }

  loadAllTenant() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  loadAllFeature() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.featureService.getAllFeatures().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const features = response.content || []; // ListData<User> có content[]
        this.availableFeature.set(features);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load features failed:', err);
        this.message.error('Không tải được danh sách features');
      }
    });
  }

  loadAllSubscription() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.subscriptionService.getAllSubscriptions().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscriptions = response.content || []; // ListData<User> có content[]
        this.availableSubscription.set(subscriptions);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load subscription failed:', err);
        this.message.error('Không tải được danh sách subscription');
      }
    });
  }

  onSubmitted() {
    console.log(this.entitlementForm.value)
    if (this.entitlementForm.valid) {
      this.isSubmitting = true;
      console.log(this.entitlementForm.value.startDate!.toString())
      const payload: EntitlementRequest = {
        startDate: this.formatDateString(this.entitlementForm.value.startDate!, 'dd-MM-yyyy HH:mm:ss'),
        endDate: this.formatDateString(this.entitlementForm.value.endDate!, 'dd-MM-yyyy HH:mm:ss'),
        status: this.entitlementForm.value.status as 'ACTIVE' | 'EXPIRED' | 'REVOKED',
        tenantId: this.entitlementForm.value.tenantId!,
        featureId: this.entitlementForm.value.featureId!,
        subscriptionId: this.entitlementForm.value.subscriptionId!,
      };


      console.log(payload)
      this.entitlementService.createEntitlement(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo entitlement thành công');
          this.entitlementForm.reset();
          this.router.navigate(['/admin/tables/entitlements']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create entitlement failed:', err);
          this.message.error('Tạo entitlement thất bại');
        }
      })
    }
  }

  formatDateString(value: unknown, format: string): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value as string);

    if (isNaN(date.getTime())) return '';

    return formatDate(date, format, 'en-US');
  }
}
