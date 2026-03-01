import {Component} from '@angular/core';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';
import {AuthPlanReuseForm} from '../../../../../shell/components/form/auth/auth-plan-reuse-form/auth-plan-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-plan-create',
  imports: [
    Breadcrumb,
    PlanReuseForm,
    AuthPlanReuseForm,
    NzModalModule,

  ],
  templateUrl: './auth-plan-create.html',
  styleUrl: './auth-plan-create.css',
})
export class AuthPlanCreate {
  // availablePrices = signal<AuthPrice[]>([]);
  // availablePlanGroup = signal<AuthPlanGroup[]>([]);
  // availableFeature = signal<AuthFeature[]>([])
  //
  // route = AUTH_PLAN_ROUTE_CONSTANT;
  // router = inject(Router);
  // isSubmitting = false;
  // priceService = inject(AuthPriceService);
  // planGroupService = inject(AuthPlanGroupService);
  // featureService = inject(AuthFeatureService);
  // planService = inject(AuthPlanService)
  //
  // message = inject(NzMessageService);
  // private fb = inject(NonNullableFormBuilder)
  //
  // planForm = this.fb.group({
  //   name: ['', [Validators.required]],
  //   image: ['', [Validators.required]],
  //   status: ['', [Validators.required, Validators.pattern('ACTIVE|DEACTIVATED|CANCEL')]],
  //   planGroupId: [null],
  //   prices: [[]],
  //   features: [[]]
  // })
  //
  // ngOnInit(): void {
  //   this.loadAllPlanGroup();
  //   this.loadAllFeature();
  //   this.loadAllPrice();
  // }
  //
  // loadAllPlanGroup() {
  //   // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
  //   this.planGroupService.getAllPlanGroups().subscribe({  // size=1000 để an toàn lấy hết
  //     next: (response) => {
  //       const planGroups = response.content || []; // ListData<User> có content[]
  //       this.availablePlanGroup.set(planGroups);
  //     },
  //     error: (err) => {
  //       console.error('Load plan groups failed:', err);
  //       this.message.error('Không tải được danh sách plan groups');
  //     }
  //   });
  // }
  //
  // loadAllFeature() {
  //   // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
  //   this.featureService.getAllFeatures().subscribe({  // size=1000 để an toàn lấy hết
  //     next: (response) => {
  //       const features = response.content || []; // ListData<User> có content[]
  //       this.availableFeature.set(features);
  //     },
  //     error: (err) => {
  //       console.error('Load features failed:', err);
  //       this.message.error('Không tải được danh sách features');
  //     }
  //   });
  // }
  //
  // loadAllPrice() {
  //   // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
  //   this.priceService.getAllPrices().subscribe({  // size=1000 để an toàn lấy hết
  //     next: (response) => {
  //       const prices = response.content || []; // ListData<User> có content[]
  //       this.availablePrices.set(prices);
  //     },
  //     error: (err) => {
  //       console.error('Load prices failed:', err);
  //       this.message.error('Không tải được danh sách price');
  //     }
  //   });
  // }
  //
  // onSubmitted() {
  //   console.log(this.planForm.value)
  //   if (this.planForm.valid) {
  //     this.isSubmitting = true;
  //     const payload: AuthPlanRequest = {
  //       name: this.planForm.value.name!,
  //       image: this.planForm.value.image!,
  //       status: this.planForm.value.status! as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
  //     }
  //
  //     const planGroupId = this.planForm.value.planGroupId! as number;
  //     if (planGroupId) {
  //       Object.assign(payload, {planGroupId});
  //     }
  //     const features = this.planForm.value.features! as number[];
  //     if (features?.length) {
  //       Object.assign(payload, {features});
  //     }
  //     const prices = this.planForm.value.prices! as number[];
  //     if (prices?.length) {
  //       Object.assign(payload, {prices});
  //     }
  //
  //     console.log(payload)
  //
  //     this.planService.createPlan(payload).subscribe({
  //       next: (response) => {
  //         this.isSubmitting = false;
  //         this.message.success('Tạo plan thành công');
  //         this.planForm.reset();
  //         this.router.navigate(['/app/tables/plans']);
  //       },
  //       error: (err) => {
  //         this.isSubmitting = false;
  //         console.error('Create plan failed:', err);
  //         this.message.error('Tạo plan thất bại');
  //       }
  //     })
  //   }
  // }
}
