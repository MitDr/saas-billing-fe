import {Component, inject, OnInit, signal} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {
  AUTH_PLAN_GROUP_ROUTE_CONSTANT
} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PlanService} from '../../../../../core/service/plan-service';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';
import {AuthPlanGroupRequest} from '../../../../../core/interface/request/auth/auth-plan-group-request';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  PlanGroupReuseForm
} from '../../../../../shell/components/form/admin/plan-group-reuse-form/plan-group-reuse-form';
import {
  AuthPlanGroupReuseForm
} from '../../../../../shell/components/form/auth/auth-plan-group-reuse-form/auth-plan-group-reuse-form';

@Component({
  selector: 'app-auth-plan-group-create',
  imports: [
    NzModalModule,
    Breadcrumb,
    PlanGroupReuseForm,
    AuthPlanGroupReuseForm,

  ],
  templateUrl: './auth-plan-group-create.html',
  styleUrl: './auth-plan-group-create.css',
})
export class AuthPlanGroupCreate implements OnInit {
  availablePlan = signal<AuthPlan[]>([]);
  route = AUTH_PLAN_GROUP_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  planService = inject(AuthPlanService)
  planGroupService = inject(AuthPlanGroupService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  planGroupForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    plans: [null],
  })

  ngOnInit(): void {
    this.loadAllPlans();
  }

  loadAllPlans() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.planService.getAllPlans().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const plans = response.content || []; // ListData<User> có content[]
        this.availablePlan.set(plans);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  onSubmitted() {
    // console.log(this.planGroupForm.value)
    if (this.planGroupForm.valid) {
      this.isSubmitting = true;

      const payload: AuthPlanGroupRequest = {
        name: this.planGroupForm.value.name!,
      }

      const plans = this.planGroupForm.value.plans! as number[];
      if (plans?.length) {
        Object.assign(payload, {plans});
      }

      if (this.planGroupForm.value.description) {
        payload.description = this.planGroupForm.value.description;
      }


      console.log(payload)
      this.planGroupService.createPlanGroup(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo invoice thành công');
          this.planGroupForm.reset();
          this.router.navigate(['/app/tables/plan-groups']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create plan group failed:', err);
          this.message.error('Tạo plan group thất bại');
        }
      })
    }
  }
}
