import {Component, inject, input, output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Image} from '../../../../../core/interface/entity/image';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-image-card',
  imports: [
    NzIconDirective,
    TenantDtoCard,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzModalModule
  ],
  templateUrl: './image-card.html',
  styleUrl: './image-card.css',
})
export class ImageCard {
  image = input.required<Image>()
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Image #${this.image().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.image().id);
      }
    });
  }
}
