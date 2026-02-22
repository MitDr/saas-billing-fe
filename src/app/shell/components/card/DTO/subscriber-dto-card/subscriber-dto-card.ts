import {Component, input} from '@angular/core';
import {SubscriberDTO} from '../../../../../core/interface/DTO/SubscriberDTO';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-subscriber-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent
  ],
  templateUrl: './subscriber-dto-card.html',
  styleUrl: './subscriber-dto-card.css',
})
export class SubscriberDtoCard {
  subscriber = input.required<SubscriberDTO>();
  numberOfColumn = input<number>(2);
  
}
