import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PriceDTO} from '../../../../../core/interface/DTO/PriceDTO';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzImageDirective} from 'ng-zorro-antd/image';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-price-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzImageDirective,
    NzTagComponent
  ],
  templateUrl: './price-dto-card.html',
  styleUrl: './price-dto-card.css',
})
export class PriceDtoCard {
  price = input.required<PriceDTO>();
  numberOfColumn = input<number>(2);
  removable = input<boolean>(false);

  modalService = inject(NzModalService);
  priceRemove = output<number>();
  private message = inject(NzMessageService);

  onRemovePrice() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa price #${this.price().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.priceRemove.emit(this.price().id);
      }
    });
  }
}
