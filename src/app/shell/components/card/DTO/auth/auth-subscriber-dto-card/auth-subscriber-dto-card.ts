import {Component, input} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {AuthSubscriberDto} from '../../../../../../core/interface/DTO/auth/auth-subscriber-dto';

@Component({
  selector: 'app-auth-subscriber-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent
  ],
  templateUrl: './auth-subscriber-dto-card.html',
  styleUrl: './auth-subscriber-dto-card.css',
})
export class AuthSubscriberDtoCard {
  subscriber = input.required<AuthSubscriberDto>();
  numberOfColumn = input<number>(2);
}
