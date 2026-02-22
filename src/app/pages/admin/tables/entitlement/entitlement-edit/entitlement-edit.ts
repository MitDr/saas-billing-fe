import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {FeatureService} from '../../../../../core/service/feature-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {EntitlementService} from '../../../../../core/service/entitlement-service';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {TenantReuseForm} from '../../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';
import {ENTITLEMENT_ROUTE_CONSTANT} from '../../../../../core/constant/entitlement/entitlement-list-constant';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {formatDate} from '@angular/common';
import {EntitlementRequest} from '../../../../../core/interface/request/entitlement-request';

@Component({
  selector: 'app-entitlement-edit',
  imports: [
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    TenantReuseForm,
    EntitlementReuseForm,
    NzModalModule
  ],
  templateUrl: './entitlement-edit.html',
  styleUrl: './entitlement-edit.css',
})
export class EntitlementEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availableFeature = signal<Feature[]>([]);
  routing = ENTITLEMENT_ROUTE_CONSTANT;
  availableSubscription = signal<Subscription[]>([]);
  featureService = inject(FeatureService);
  tenantService = inject(TenantService);
  entitlementService = inject(EntitlementService);
  subscriptionService = inject(SubscriptionService);
  message = inject(NzMessageService);
  initSubscription = signal<Subscription | null>(null);
  initFeature = signal<Feature | null>(null);
  initTenant = signal<Tenant | null>(null);
  entitlement = signal<Entitlement | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  entitlementForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|EXPIRED|REVOKED')]],
    tenantId: [null as number | null, [Validators.required]],
    featureId: [null as number | null, [Validators.required]],
    subscriptionId: [null as number | null, [Validators.required]],
    startDate: [null as Date | null, [Validators.required]],
    endDate: [null as Date | null, [Validators.required]],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadEntitlement(+id);
      }
    });
    effect(() => {
      const currentEntitlement = this.entitlement();
      if (currentEntitlement) {
        this.entitlementForm.patchValue({
          status: currentEntitlement.status,
          tenantId: currentEntitlement.tenant?.id || null,
          featureId: currentEntitlement.feature?.id || null,
          subscriptionId: currentEntitlement.subscription.id || null,
          startDate: this.parseDate(currentEntitlement.startDate),
          endDate: this.parseDate(currentEntitlement.endDate),
        });
        this.getSubscription(currentEntitlement?.subscription.id);
        this.getFeature(currentEntitlement?.feature.id!);
        this.getTenant(currentEntitlement?.tenant.id!);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllFeature();
    this.loadAllSubscription()

  }

  loadEntitlement(id: number) {
    this.loading.set(true);
    this.entitlementService.getEntitlement(id).subscribe({
      next: (response) => {
        this.entitlement.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
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
    this.featureService.getAllFeatures().subscribe({
      next: (response) => {
        const features = response.content || [];
        this.availableFeature.set(features);
      },
      error: (err) => {
        console.error('Load features failed:', err);
        this.message.error('Không tải được danh sách features');
      }
    });
  }

  loadAllSubscription() {
    this.subscriptionService.getAllSubscriptions().subscribe({
      next: (response) => {
        const subscriptions = response.content || [];
        this.availableSubscription.set(subscriptions);
      },
      error: (err) => {
        console.error('Load subscription failed:', err);
        this.message.error('Không tải được danh sách subscription');
      }
    });
  }

  getSubscription(id: number) {
    return this.subscriptionService.getSubscription(id).subscribe({
      next: (response) => {
        this.initSubscription.set(response);
      }
    });
  }

  getFeature(id: number) {
    return this.featureService.getFeature(id).subscribe({
      next: (response) => {
        this.initFeature.set(response);
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
    // console.log(this.entitlementForm.value)
    if (this.entitlementForm.valid) {
      // this.isSubmitting = true;
      // console.log(this.entitlementForm.value.startDate!.toString())
      const payload: EntitlementRequest = {
        startDate: this.formatDateString(this.entitlementForm.value.startDate!, 'dd-MM-yyyy HH:mm:ss'),
        endDate: this.formatDateString(this.entitlementForm.value.endDate!, 'dd-MM-yyyy HH:mm:ss'),
        status: this.entitlementForm.value.status as 'ACTIVE' | 'EXPIRED' | 'REVOKED',
        tenantId: this.entitlementForm.value.tenantId!,
        featureId: this.entitlementForm.value.featureId!,
        subscriptionId: this.entitlementForm.value.subscriptionId!,
      };
      //
      //
      // console.log(payload)
      this.entitlementService.update(payload, this.entitlement()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update entitlement thành công');
          this.entitlementForm.reset();
          this.router.navigate(['/admin/tables/entitlements']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('update entitlement failed:', err);
          this.message.error('update entitlement thất bại');
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

  parseDate(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }

    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute, second);
  }
}
