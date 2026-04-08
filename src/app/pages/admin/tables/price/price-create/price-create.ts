import {Component, inject, OnInit, signal} from '@angular/core';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {PriceReuseForm} from '../../../../../shell/components/form/admin/price-reuse-form/price-reuse-form';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {Router} from '@angular/router';
import {PRICE_ROUTE_CONSTANT} from '../../../../../core/constant/price/price-list-constant';
import {PlanService} from '../../../../../core/service/plan-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PriceService} from '../../../../../core/service/price-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {PriceRequest} from '../../../../../core/interface/request/price-request';

@Component({
  selector: 'app-price-create',
  imports: [
    Breadcrumb,
    InvoiceReuseForm,
    PriceReuseForm,
    PlanReuseForm,
    FeatureReuseForm,
    NzModalModule
  ],
  templateUrl: './price-create.html',
  styleUrl: './price-create.css',
})
export class PriceCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePlans = signal<Plan[]>([]);
  route = PRICE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  planService = inject(PlanService);
  tenantService = inject(TenantService);
  priceService = inject(PriceService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  priceForm = this.fb.group({
    price: [null, [Validators.required]],
    currency: ['', [Validators.required, Validators.pattern('USD|VND')]],
    cycle: ['', [Validators.required, Validators.pattern('MONTH|DAY|WEEK|YEAR')]],
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DEACTIVATED|CANCEL')]],
    cycleCount: [null, Validators.required],
    maxUnit: [null, Validators.required],
    trialPeriod: [null, Validators.required],
    trialCycle: ['', [Validators.required, Validators.pattern('MONTH|DAY|WEEK|YEAR')]],
    dueDelay: [null, Validators.required],
    planId: [null],
    tenantId: [null, Validators.required]
  })

  ngOnInit(): void {
    this.loadAllPlans();
    this.loadAllTenant()
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
        this.message.error('Cannot load tenant');
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
        console.error('Load plans failed', err);
        this.message.error('Cannot load plans');
      }
    });
  }

  onSubmitted() {
    console.log(this.priceForm.value)

    if (this.priceForm.valid) {
      this.isSubmitting = true;
      const payload: PriceRequest = {
        price: this.priceForm.value.price!,
        currency: this.priceForm.value.currency as 'USD' | 'VND',
        cycle: this.priceForm.value.cycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        status: this.priceForm.value.status as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
        cycleCount: this.priceForm.value.cycleCount!,
        maxUnit: this.priceForm.value.maxUnit!,
        trialPeriod: this.priceForm.value.trialPeriod!,
        trialCycle: this.priceForm.value.trialCycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        dueDelay: this.priceForm.value.dueDelay!,
        tenantId: this.priceForm.value.tenantId!
      }

      if (this.priceForm.value.currency === 'USD' && typeof this.priceForm.value.price === 'number') {
        const price = Math.round(this.priceForm.value.price * 100);
        Object.assign(payload, {price})
      }

      const planId = this.priceForm.value.planId! as number;
      if (planId) {
        Object.assign(payload, {planId});
      }
      console.log(payload)
      this.priceService.createPrice(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Create price successfully');
          this.priceForm.reset();
          this.router.navigate(['/admin/tables/prices']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create price failed:', err);
          this.message.error('Create price failed');
        }
      })
    }
  }
}
