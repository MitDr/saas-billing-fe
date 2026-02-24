import {Component, effect, inject, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {FeatureService} from '../../../../../core/service/feature-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PlanService} from '../../../../../core/service/plan-service';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Feature} from '../../../../../core/interface/entity/feature';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {SUBSCRIBER_ROUTE_CONSTANT} from '../../../../../core/constant/subscriber/subscriber-list-constant';
import {
  SubscriberReuseForm
} from '../../../../../shell/components/form/admin/subscriber-reuse-form/subscriber-reuse-form';

@Component({
  selector: 'app-subscriber-edit',
  imports: [
    Breadcrumb,
    FeatureReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    SubscriberReuseForm
  ],
  templateUrl: './subscriber-edit.html',
  styleUrl: './subscriber-edit.css',
})
export class SubscriberEdit {
  availableTenant = signal<Tenant[]>([]);
  routing = SUBSCRIBER_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  subscriberService = inject(SubscriberService);
  message = inject(NzMessageService);
  initTenant = signal<Tenant | null>(null);
  subscriber = signal<Subscriber | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  subscriberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    // customerId: [''],
    tenantId: [null as number | null, [Validators.required]],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadSubscriber(+id);
      }
    });
    effect(() => {
      const currentSubscriber = this.subscriber();
      if (currentSubscriber) {
        this.subscriberForm.patchValue({
          name: currentSubscriber.name,
          email: currentSubscriber.email,
          // customerId: currentSubscriber.customerId,
          tenantId: currentSubscriber.tenant?.id
        });
        this.getTenant(currentSubscriber?.tenant.id!);
      }
    });
  }

  loadSubscriber(id: number) {
    this.loading.set(true);
    this.subscriberService.getSubscriber(id).subscribe({
      next: (response) => {
        this.subscriber.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
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
    console.log(this.subscriberForm.value)
    if (this.subscriberForm.valid) {
      this.isSubmitting = true;
    }
  }

}
