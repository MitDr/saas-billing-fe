import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Plan} from '../../../../../core/interface/entity/plan';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzImageDirective, NzImageModule} from 'ng-zorro-antd/image';
import {fallbackImageConst, PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {PriceDtoCard} from '../../DTO/price-dto-card/price-dto-card';
import {PlanService} from '../../../../../core/service/plan-service';
import {PlanRequest} from '../../../../../core/interface/request/plan-request';
import {FeatureDtoCard} from '../../DTO/feature-dto-card/feature-dto-card';
import {PlanGroupDtoCard} from '../../DTO/plan-group-dto-card/plan-group-dto-card';

@Component({
  selector: 'app-plan-card',
  imports: [
    NzCardComponent,
    NzTagComponent,
    NzImageDirective,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    RouterLink,
    NzButtonComponent,
    NzIconDirective,
    TenantDtoCard,
    NzImageModule,
    EntitlementDtoCard,
    PriceDtoCard,
    PlanDtoCard,
    FeatureDtoCard,
    PlanGroupDtoCard
  ],
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.css',
})
export class PlanCard {
  plan = input.required<Plan>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  planService = inject(PlanService);
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

  private removePriceAndMapPlanToPlanRequest(plan: Plan, id: number) {
    const result: PlanRequest = {
      name: plan.name,
      image: plan.image,
      status: plan.status,
      tenantId: plan.tenant.id
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

  private removeFeatureAndMapPlanToPlanRequest(plan: Plan, id: number) {
    const result: PlanRequest = {
      name: plan.name,
      image: plan.image,
      status: plan.status,
      tenantId: plan.tenant.id
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
