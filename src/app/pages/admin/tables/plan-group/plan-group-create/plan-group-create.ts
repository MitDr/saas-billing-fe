import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PlanService} from '../../../../../core/service/plan-service';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {PLAN_GROUP_ROUTE_CONSTANT} from '../../../../../core/constant/plan-group/plan-group-list-constant';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {
  PlanGroupReuseForm
} from '../../../../../shell/components/form/admin/plan-group-reuse-form/plan-group-reuse-form';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';

@Component({
  selector: 'app-plan-group-create',
  imports: [
    NzModalModule,
    Breadcrumb,
    InvoiceReuseForm,
    PlanGroupReuseForm,

  ],
  templateUrl: './plan-group-create.html',
  styleUrl: './plan-group-create.css',
})
export class PlanGroupCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePlan = signal<Plan[]>([]);
  route = PLAN_GROUP_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  tenantService = inject(TenantService);
  planService = inject(PlanService)
  planGroupService = inject(PlanGroupService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  planGroupForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    plans: [null],
    tenantId: [null, [Validators.required]]
  })

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllPlans();
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

      const payload: PlanGroupRequest = {
        name: this.planGroupForm.value.name!,
        tenantId: this.planGroupForm.value.tenantId!
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
          this.router.navigate(['/admin/tables/plan-groups']);
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
