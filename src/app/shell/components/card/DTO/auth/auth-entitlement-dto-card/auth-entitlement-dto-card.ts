import {Component, input} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {AuthEntitlementDto} from '../../../../../../core/interface/DTO/auth/auth-entitlement-dto';

@Component({
  selector: 'app-auth-entitlement-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent
  ],
  templateUrl: './auth-entitlement-dto-card.html',
  styleUrl: './auth-entitlement-dto-card.css',
})
export class AuthEntitlementDtoCard {
  entitlementDto = input.required<AuthEntitlementDto>();
  numberOfColumn = input<number>(2);
}
