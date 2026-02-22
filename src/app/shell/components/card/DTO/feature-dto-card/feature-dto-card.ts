import {Component, inject, input, output} from '@angular/core';
import {FeatureDTO} from '../../../../../core/interface/DTO/FeatureDTO';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-feature-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent,
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './feature-dto-card.html',
  styleUrl: './feature-dto-card.css',
})
export class FeatureDtoCard {
  feature = input.required<FeatureDTO>();
  numberOfColumn = input<number>(2);

  removable = input<boolean>(false);
  modalService = inject(NzModalService);
  featureRemove = output<number>();
  private message = inject(NzMessageService);

  onRemoveFeature() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa feature #${this.feature().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.featureRemove.emit(this.feature().id);
      }
    });
  }
}
