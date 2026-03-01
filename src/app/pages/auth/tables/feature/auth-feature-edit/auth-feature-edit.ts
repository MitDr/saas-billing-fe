import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {FEATURE_AUTH_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthFeatureRequest} from '../../../../../core/interface/request/auth/auth-feature-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  AuthFeatureReuseForm
} from '../../../../../shell/components/form/auth/auth-feature-reuse-form/auth-feature-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-feature-edit',
  imports: [
    Breadcrumb,
    FeatureReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    AuthFeatureReuseForm,
    NzModalModule
  ],
  templateUrl: './auth-feature-edit.html',
  styleUrl: './auth-feature-edit.css',
})
export class AuthFeatureEdit implements OnInit {
  availablePlans = signal<AuthPlan[]>([]);
  routing = FEATURE_AUTH_ROUTE_CONSTANT;
  featureService = inject(AuthFeatureService);
  planService = inject(AuthPlanService);
  message = inject(NzMessageService);
  initPlans = signal<AuthPlan[]>([]);
  feature = signal<AuthFeature | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  featureForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|INACTIVE')]],
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    description: [''],
    plans: [[] as number[], []],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadFeature(+id);
      }
    });
    effect(() => {
      const currentFeature = this.feature();
      if (currentFeature) {
        this.featureForm.patchValue({
          status: currentFeature.status,
          name: currentFeature.name,
          code: currentFeature.code,
          description: currentFeature.description,
        });
        if (currentFeature.plans?.length > 0) {
          this.featureForm.patchValue({
            plans: currentFeature.plans.map(u => u.id)
          })
        }
        this.getPlans(currentFeature?.plans.map(u => u.id))
      }
    });
  }

  ngOnInit(): void {
    this.loadAllPlans();
  }

  loadFeature(id: number) {
    this.loading.set(true);
    this.featureService.getFeature(id).subscribe({
      next: (response) => {
        this.feature.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  loadAllPlans() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.planService.getAllPlans().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const plans = response.content || []; // ListData<User> có content[]
        this.availablePlans.set(plans);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  getPlans(ids: number[]): void {
    this.planService.getAllPlans().subscribe({
      next: (plans) => {
        const idSet = new Set(ids);
        const filteredPlans = plans.content.filter(plan => idSet.has(plan.id));
        this.initPlans.set(filteredPlans);
      }
    });
  }

  onSubmitted() {
    if (this.featureForm.valid) {
      this.isSubmitting = true;
      const payload: AuthFeatureRequest = {
        code: this.featureForm.value.code!,
        name: this.featureForm.value.name!,
        status: this.featureForm.value.status as 'ACTIVE' | 'INACTIVE',
      }

      if (this.featureForm.value.description) {
        const description = this.featureForm.value.description as string;
        Object.assign(payload, {description})
      }
      const plans = this.featureForm.value.plans! as number[];
      if (plans?.length) {
        Object.assign(payload, {plans});
      }
      this.featureService.update(payload, this.feature()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update feature thành công');
          this.featureForm.reset();
          this.router.navigate(['/app/tables/features']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update feature failed:', err);
          this.message.error('update feature thất bại');
        }
      })
    }
  }
}
