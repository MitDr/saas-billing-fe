import {Component, inject, OnInit, signal} from '@angular/core';
import {FEATURE_AUTH_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {AuthFeatureRequest} from '../../../../../core/interface/request/auth/auth-feature-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {
  AuthFeatureReuseForm
} from '../../../../../shell/components/form/auth/auth-feature-reuse-form/auth-feature-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-feature-create',
  imports: [
    Breadcrumb,
    FeatureReuseForm,
    AuthFeatureReuseForm,
    NzModalModule,
  ],
  templateUrl: './auth-feature-create.html',
  styleUrl: './auth-feature-create.css',
})
export class AuthFeatureCreate implements OnInit {
  availablePlans = signal<AuthPlan[]>([]);
  route = FEATURE_AUTH_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  planService = inject(AuthPlanService);
  featureService = inject(AuthFeatureService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  featureForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|INACTIVE')]],
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    description: [''],
    plans: [[]],
  })

  ngOnInit(): void {
    this.loadAllPlans();
  }

  loadAllPlans() {
    this.planService.getAllPlans().subscribe({
      next: (response) => {
        const plans = response.content || [];
        this.availablePlans.set(plans);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  onSubmitted() {
    console.log(this.featureForm.value)

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
      console.log(payload)
      this.featureService.createFeature(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo tenant thành công');
          this.featureForm.reset();
          this.router.navigate(['/app/tables/features']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create feature failed:', err);
          this.message.error('Tạo feature thất bại');
        }
      })
    }
  }
}
