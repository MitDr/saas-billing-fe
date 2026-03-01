import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {fallbackImageConst} from '../../DTO/plan-dto-card/plan-dto-card';
import {AuthPlanRequest} from '../../../../../core/interface/request/auth/auth-plan-request';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {FeatureDtoCard} from '../../DTO/feature-dto-card/feature-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzImageDirective} from 'ng-zorro-antd/image';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PriceDtoCard} from '../../DTO/price-dto-card/price-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';
import {AuthFeatureDtoCard} from '../../DTO/auth/auth-feature-dto-card/auth-feature-dto-card';
import {AuthPriceDtoCard} from '../../DTO/auth/auth-price-dto-card/auth-price-dto-card';
import {PlanGroupDtoCard} from '../../DTO/plan-group-dto-card/plan-group-dto-card';
import {AuthPlanGroupDtoCard} from '../../DTO/auth/auth-plan-group-dto-card/auth-plan-group-dto-card';

@Component({
  selector: 'app-auth-plan-card',
  imports: [
    FeatureDtoCard,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzImageDirective,
    NzTagComponent,
    PriceDtoCard,
    TenantDtoCard,
    RouterLink,
    AuthFeatureDtoCard,
    AuthPriceDtoCard,
    PlanGroupDtoCard,
    AuthPlanGroupDtoCard
  ],
  templateUrl: './auth-plan-card.html',
  styleUrl: './auth-plan-card.css',
})
export class AuthPlanCard {
  plan = input.required<AuthPlan>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  planService = inject(AuthPlanService);
  load = output<number>();
  protected readonly fallbackImageConst = fallbackImageConst;
  private message = inject(NzMessageService);


  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa plan #${this.plan().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.plan().id);
      }
    });
  }

  onPriceRemove(id: number) {
    this.planService.update(this.removePriceAndMapPlanToPlanRequest(this.plan(), id), this.plan().id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.load.emit(this.plan().id);
      },
      error: () => {
        this.message.error('Update failed');
        this.load.emit(this.plan().id);
      }
    });
  }

  onFeatureRemove(id: number) {
    this.planService.update(this.removeFeatureAndMapPlanToPlanRequest(this.plan(), id), this.plan().id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.load.emit(this.plan().id);
      },
      error: () => {
        this.message.error('Update failed');
        this.load.emit(this.plan().id);
      }
    });
  }

  private removePriceAndMapPlanToPlanRequest(plan: AuthPlan, id: number) {
    const result: AuthPlanRequest = {
      name: plan.name,
      status: plan.status,
    }
    if (plan.prices.length > 0) {
      result.prices = plan.prices
        .filter(price => price.id !== id)
        .map(price => price.id);
    }
    if (plan.features.length > 0) {
      result.features = plan.features.map(feature => feature.id);
    }
    return result;
  }

  private removeFeatureAndMapPlanToPlanRequest(plan: AuthPlan, id: number) {
    const result: AuthPlanRequest = {
      name: plan.name,
      status: plan.status,
    }
    if (plan.prices.length > 0) {
      result.prices = plan.prices.map(price => price.id)
    }
    if (plan.features.length > 0) {
      result.features = plan.features
        .filter(feature => feature.id !== id)
        .map(feature => feature.id);
    }
    return result;
  }
}
