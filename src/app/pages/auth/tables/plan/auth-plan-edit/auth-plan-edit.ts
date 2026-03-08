import {Component, inject, signal, ViewChild} from '@angular/core';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthPlanReuseForm} from '../../../../../shell/components/form/auth/auth-plan-reuse-form/auth-plan-reuse-form';
import {AUTH_PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {Router} from '@angular/router';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder} from '@angular/forms';

@Component({
  selector: 'app-auth-plan-edit',
  imports: [],
  templateUrl: './auth-plan-edit.html',
  styleUrl: './auth-plan-edit.css',
})
export class AuthPlanEdit {
  availablePrices = signal<AuthPrice[]>([]);
  availablePlanGroup = signal<AuthPlanGroup[]>([]);
  availableFeature = signal<AuthFeature[]>([])
  @ViewChild(AuthPlanReuseForm) planFormComponent!: AuthPlanReuseForm;
  route = AUTH_PLAN_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  priceService = inject(AuthPriceService);
  planGroupService = inject(AuthPlanGroupService);
  featureService = inject(AuthFeatureService);
  planService = inject(AuthPlanService)
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
}
