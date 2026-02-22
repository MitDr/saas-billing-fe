import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PlanGroupDTO} from '../../../../../core/interface/DTO/planGroupDTO';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-plan-group-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './plan-group-dto-card.html',
  styleUrl: './plan-group-dto-card.css',
})
export class PlanGroupDtoCard {
  planGroup = input.required<PlanGroupDTO>();
  numberOfColumn = input<number>(2);

  removable = input<boolean>(false);
  modalService = inject(NzModalService);
  featureRemove = output<number>();
  private message = inject(NzMessageService);

  onPlanGroupRemove() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa plan group #${this.planGroup().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.featureRemove.emit(this.planGroup().id);
      }
    });
  }
}
