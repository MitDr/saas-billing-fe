import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Plan} from '../../../../../core/interface/entity/plan';
import {AUTH_PRICE_ROUTE_CONSTANT, PRICE_ROUTE_CONSTANT} from '../../../../../core/constant/price/price-list-constant';
import {PriceService} from '../../../../../core/service/price-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PlanService} from '../../../../../core/service/plan-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {Price} from '../../../../../core/interface/entity/price';
import { AuthPrice } from "../../../../../core/interface/entity/auth/auth-price";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {PriceRequest} from '../../../../../core/interface/request/price-request';
import {AuthPriceRequest} from '../../../../../core/interface/request/auth/auth-price-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PriceReuseForm} from '../../../../../shell/components/form/admin/price-reuse-form/price-reuse-form';
import {
  AuthPriceReuseForm
} from '../../../../../shell/components/form/auth/auth-price-reuse-form/auth-price-reuse-form';

@Component({
  selector: 'app-auth-price-edit',
  imports: [
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PriceReuseForm,
    RouterLink,
    AuthPriceReuseForm
  ],
  templateUrl: './auth-price-edit.html',
  styleUrl: './auth-price-edit.css',
})
export class AuthPriceEdit implements OnInit {
  availablePlans = signal<AuthPlan[]>([]);
  routing = AUTH_PRICE_ROUTE_CONSTANT;
  priceService = inject(AuthPriceService);
  planService = inject(AuthPlanService);
  message = inject(NzMessageService);
  initPlan = signal<AuthPlan | null>(null);
  price = signal<AuthPrice | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  priceForm = this.fb.group({
    price: [null as number | null, [Validators.required]],
    currency: ['', [Validators.required, Validators.pattern('USD|VND')]],
    scheme: ['', [Validators.required, Validators.pattern('FLAT_RATE|PER_UNIT')]],
    cycle: ['', [Validators.required, Validators.pattern('MONTH|DAY|WEEK|YEAR')]],
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DEACTIVATED|CANCEL')]],
    cycleCount: [null as number | null, Validators.required],
    maxUnit: [null as number | null, Validators.required],
    trialPeriod: [null as number | null, Validators.required],
    trialCycle: ['', [Validators.required, Validators.pattern('MONTH|DAY|WEEK|YEAR')]],
    dueDelay: [null as number | null, Validators.required],
    planId: [null as number | null],
  })

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPrice(+id);
      }
    });
    effect(() => {
      const currentPrice = this.price();
      if (currentPrice) {
        this.priceForm.patchValue({
          price: currentPrice?.price!,
          currency: currentPrice.currency as 'USD' | 'VND',
          scheme: currentPrice.scheme as 'FLAT_RATE' | 'PER_UNIT',
          cycle: currentPrice.cycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
          status: currentPrice.status as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
          cycleCount: currentPrice.cycleCount!,
          maxUnit: currentPrice.maxUnit!,
          trialPeriod: currentPrice.trialPeriod!,
          trialCycle: currentPrice.trialCycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
          dueDelay: currentPrice.dueDelay!,
          planId: currentPrice.plan?.id || null
        });
        if (currentPrice.plan) {
          this.getPlan(currentPrice.plan?.id)
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadAllPlans();
  }

  loadPrice(id: number) {
    this.loading.set(true);
    this.priceService.getPrice(id).subscribe({
      next: (response) => {
        this.price.set(response);
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

  getPlan(id: number) {
    return this.planService.getPlan(id).subscribe({
      next: (response) => {
        this.initPlan.set(response);
      }
    });
  }

  onSubmitted() {
    console.log(this.priceForm.value)

    if (this.priceForm.valid) {
      this.isSubmitting = true;
      const payload: AuthPriceRequest = {
        price: this.priceForm.value.price!,
        currency: this.priceForm.value.currency as 'USD' | 'VND',
        scheme: this.priceForm.value.scheme as 'FLAT_RATE' | 'PER_UNIT',
        cycle: this.priceForm.value.cycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        status: this.priceForm.value.status as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
        cycleCount: this.priceForm.value.cycleCount!,
        maxUnit: this.priceForm.value.maxUnit!,
        trialPeriod: this.priceForm.value.trialPeriod!,
        trialCycle: this.priceForm.value.trialCycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        dueDelay: this.priceForm.value.dueDelay!,
      }

      const planId = this.priceForm.value.planId! as number;
      if (planId) {
        Object.assign(payload, {planId});
      }
      console.log(payload)
      this.priceService.update(payload, this.price()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update price thành công');
          this.priceForm.reset();
          this.router.navigate(['/app/tables/prices']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update price failed:', err);
          this.message.error('Update price thất bại');
        }
      })
    }
  }
}
