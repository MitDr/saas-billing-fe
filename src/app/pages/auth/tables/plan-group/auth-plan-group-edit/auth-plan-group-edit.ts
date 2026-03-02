import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Plan} from '../../../../../core/interface/entity/plan';
import {
  AUTH_PLAN_GROUP_ROUTE_CONSTANT
} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PlanService} from '../../../../../core/service/plan-service';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';
import {AuthPlanGroupRequest} from '../../../../../core/interface/request/auth/auth-plan-group-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  PlanGroupReuseForm
} from '../../../../../shell/components/form/admin/plan-group-reuse-form/plan-group-reuse-form';
import {
  AuthPlanGroupReuseForm
} from '../../../../../shell/components/form/auth/auth-plan-group-reuse-form/auth-plan-group-reuse-form';

@Component({
  selector: 'app-auth-plan-group-edit',
  imports: [
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PlanGroupReuseForm,
    RouterLink,
    AuthPlanGroupReuseForm
  ],
  templateUrl: './auth-plan-group-edit.html',
  styleUrl: './auth-plan-group-edit.css',
})
export class AuthPlanGroupEdit implements OnInit {
  availablePlan = signal<AuthPlan[]>([]);
  routing = AUTH_PLAN_GROUP_ROUTE_CONSTANT;
  planService = inject(AuthPlanService);
  planGroupService = inject(AuthPlanGroupService);

  message = inject(NzMessageService);
  initPlan = signal<AuthPlan[]>([]);
  planGroup = signal<AuthPlanGroup | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  planGroupForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    plans: [null as number[] | null],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPlanGroup(+id);
      }
    });
    effect(() => {
      const currentPlanGroup = this.planGroup();
      if (currentPlanGroup) {
        this.planGroupForm.patchValue({
          name: currentPlanGroup.name,
          // metadata: currentInvoice.metadata
        });
        this.getPlan(currentPlanGroup?.plans.map(u => u.id))
      }
    });
  }

  loadPlanGroup(id: number) {
    this.loading.set(true);
    this.planGroupService.getPlanGroup(id).subscribe({
      next: (response) => {
        this.planGroup.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllPlan();

  }

  loadAllPlan() {
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

  getPlan(ids: number[]): void {
    this.planService.getAllPlans().subscribe({
      next: (plans) => {
        const idSet = new Set(ids);
        const filterPlan = plans.content.filter(plan => idSet.has(plan.id));
        this.initPlan.set(filterPlan);
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

      const plans = this.planGroupForm.value.plans!;
      if (plans?.length) {
        Object.assign(payload, {plans});
      }

      if (this.planGroupForm.value.description) {
        payload.description = this.planGroupForm.value.description;
      }


      // console.log(payload)
      this.planGroupService.update(payload, this.planGroup()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update invoice thành công');
          this.planGroupForm.reset();
          this.router.navigate(['/app/tables/plan-groups']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update plan group failed:', err);
          this.message.error('Update plan group thất bại');
        }
      })
    }
  }
}
