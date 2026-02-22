import {Component, input} from '@angular/core';
import {SubscriptionDTO} from '../../../../../core/interface/DTO/SubscriptionDTO';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-subscription-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './subscription-dto-card.html',
  styleUrl: './subscription-dto-card.css',
})
export class SubscriptionDtoCard {
  subscription = input.required<SubscriptionDTO>();
  numberOfColumn = input<number>(2);
  
}
