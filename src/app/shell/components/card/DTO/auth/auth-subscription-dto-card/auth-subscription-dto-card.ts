import {Component, input} from '@angular/core';
import {AuthSubscriptionDto} from '../../../../../../core/interface/DTO/auth/auth-subscription-dto';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-auth-subscription-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent
  ],
  templateUrl: './auth-subscription-dto-card.html',
  styleUrl: './auth-subscription-dto-card.css',
})
export class AuthSubscriptionDtoCard {
  subscription = input.required<AuthSubscriptionDto>();
  numberOfColumn = input<number>(2);

}
