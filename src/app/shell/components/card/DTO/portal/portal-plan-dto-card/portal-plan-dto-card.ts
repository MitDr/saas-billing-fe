import {Component, inject, input, output} from '@angular/core';
import {AuthPlanDto} from '../../../../../../core/interface/DTO/auth/auth-plan-dto';
import {PortalPlanDto} from '../../../../../../core/interface/portal/DTO/portal-plan-dto';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {fallbackImageConst} from '../../auth/auth-plan-dto-card/auth-plan-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzImageDirective} from 'ng-zorro-antd/image';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-portal-plan-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzImageDirective,
    NzTagComponent
  ],
  templateUrl: './portal-plan-dto-card.html',
  styleUrl: './portal-plan-dto-card.css',
})
export class PortalPlanDtoCard {
  plan = input.required<PortalPlanDto>();
  numberOfColumn = input<number>(2);
  removable = input<boolean>(false);

  modalService = inject(NzModalService);
  planRemove = output<number>();
  protected readonly fallbackImageConst = fallbackImageConst;
  private message = inject(NzMessageService);

}
