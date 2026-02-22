import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Feature} from '../../../../../core/interface/entity/feature';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {UserDtoCard} from '../../DTO/user-dto-card/user-dto-card';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {FeatureService} from '../../../../../core/service/feature-service';
import {FeatureRequest} from '../../../../../core/interface/request/feature-request';

@Component({
  selector: 'app-feature-card',
  imports: [
    NzCardComponent,
    NzTagComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    RouterLink,
    NzButtonComponent,
    NzIconDirective,
    TenantDtoCard,
    UserDtoCard,
    EntitlementDtoCard,
    PlanDtoCard
  ],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.css',
})
export class FeatureCard {
  feature = input.required<Feature>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  featureService = inject(FeatureService)
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

  private removePlanAndMapFeatureToFeatureRequest(feature: Feature, id: number) {
    const result: FeatureRequest = {
      name: feature.name,
      description: feature.description,
      code: feature.code,
      status: feature.status,
      tenantId: feature.tenant.id
    }
    if (feature.plans.length > 0) {
      result.plans = feature.plans
        .filter(plan => plan.id !== id)
        .map(plan => plan.id);
    }
    return result;
  }
}
