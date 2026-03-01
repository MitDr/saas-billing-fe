import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {AuthFeatureRequest} from '../../../../../core/interface/request/auth/auth-feature-request';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {AuthPlanDtoCard} from '../../DTO/auth/auth-plan-dto-card/auth-plan-dto-card';
import {AuthEntitlementDtoCard} from '../../DTO/auth/auth-entitlement-dto-card/auth-entitlement-dto-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-feature-card',
  imports: [
    EntitlementDtoCard,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    PlanDtoCard,
    TenantDtoCard,
    AuthPlanDtoCard,
    AuthEntitlementDtoCard,
    RouterLink
  ],
  templateUrl: './auth-feature-card.html',
  styleUrl: './auth-feature-card.css',
})
export class AuthFeatureCard {
  feature = input.required<AuthFeature>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  featureService = inject(AuthFeatureService)
  load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Feature #${this.feature().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.feature().id);
      }
    });
  }

  onPlanRemoved(id: number) {
    this.featureService.update(this.removePlanAndMapFeatureToFeatureRequest(this.feature(), id), this.feature().id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.load.emit(this.feature().id);
      },
      error: () => {
        this.message.error('Update failed');
        this.load.emit(this.feature().id);
      }
    });
  }

  private removePlanAndMapFeatureToFeatureRequest(feature: AuthFeature, id: number) {
    const result: AuthFeatureRequest = {
      name: feature.name,
      description: feature.description,
      code: feature.code,
      status: feature.status,
      // tenantId: feature.tenant.id
    }
    if (feature.plans.length > 0) {
      result.plans = feature.plans
        .filter(plan => plan.id !== id)
        .map(plan => plan.id);
    }
    return result;
  }
}
