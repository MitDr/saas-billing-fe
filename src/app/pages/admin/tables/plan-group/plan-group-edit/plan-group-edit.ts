import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PLAN_GROUP_ROUTE_CONSTANT} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {PlanService} from '../../../../../core/service/plan-service';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';
import {
  PlanGroupReuseForm
} from '../../../../../shell/components/form/admin/plan-group-reuse-form/plan-group-reuse-form';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';

@Component({
  selector: 'app-plan-group-edit',
  imports: [
    NzModalModule,
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PlanReuseForm,
    RouterLink,
    PlanGroupReuseForm
  ],
  templateUrl: './plan-group-edit.html',
  styleUrl: './plan-group-edit.css',
})
export class PlanGroupEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePlan = signal<Plan[]>([]);
  routing = PLAN_GROUP_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  planService = inject(PlanService);
  planGroupService = inject(PlanGroupService);

  message = inject(NzMessageService);

  initTenant = signal<Tenant | null>(null);
  initPlan = signal<Plan[]>([]);
  planGroup = signal<PlanGroup | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  planGroupForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    plans: [null as number[] | null],
    tenantId: [null as number | null, [Validators.required]]
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
          tenantId: currentPlanGroup.tenant.id
          // metadata: currentInvoice.metadata
        });
        this.getPlan(currentPlanGroup?.plans.map(u => u.id))
        this.getTenant(currentPlanGroup?.tenant.id!);
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
    this.loadAllTenant();
    this.loadAllPlan();

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

  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
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

      const payload: PlanGroupRequest = {
        name: this.planGroupForm.value.name!,
        tenantId: this.planGroupForm.value.tenantId!
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
          this.router.navigate(['/admin/tables/plan-groups']);
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
