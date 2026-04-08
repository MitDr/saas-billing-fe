import {Component, inject, OnInit, signal} from '@angular/core';
import {AUTH_PRICE_ROUTE_CONSTANT} from '../../../../../core/constant/price/price-list-constant';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {AuthPriceRequest} from '../../../../../core/interface/request/auth/auth-price-request';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  AuthPriceReuseForm
} from '../../../../../shell/components/form/auth/auth-price-reuse-form/auth-price-reuse-form';

@Component({
  selector: 'app-auth-price-create',
  imports: [
    NzModalModule,
    Breadcrumb,
    AuthPriceReuseForm
  ],
  templateUrl: './auth-price-create.html',
  styleUrl: './auth-price-create.css',
})
export class AuthPriceCreate implements OnInit {
  availablePlans = signal<AuthPlan[]>([]);
  route = AUTH_PRICE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  planService = inject(AuthPlanService);
  priceService = inject(AuthPriceService);
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
  })

  ngOnInit(): void {
    this.loadAllPlans();
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
        console.error('Load plans failed:', err);
        this.message.error('Cannot load plans');
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
        cycle: this.priceForm.value.cycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        status: this.priceForm.value.status as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
        cycleCount: this.priceForm.value.cycleCount!,
        maxUnit: this.priceForm.value.maxUnit!,
        trialPeriod: this.priceForm.value.trialPeriod!,
        trialCycle: this.priceForm.value.trialCycle as 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
        dueDelay: this.priceForm.value.dueDelay!,
      }

      if (this.priceForm.value.currency === 'USD' && typeof this.priceForm.value.price === 'number') {
        const price = Math.round(this.priceForm.value.price * 100);
        Object.assign(payload, {price})
      }

      const planId = this.priceForm.value.planId! as number;
      if (planId) {
        Object.assign(payload, {planId});
      }
      // console.log(payload)
      this.priceService.createPrice(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Create price Successfully');
          this.priceForm.reset();
          this.router.navigate(['/app/tables/prices']);
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
