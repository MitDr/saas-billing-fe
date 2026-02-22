import {Component, input} from '@angular/core';
import {EntitlementDTO} from '../../../../../core/interface/DTO/EntitlementDTO';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-entitlement-dto-card',
  imports: [
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzTagComponent
  ],
  templateUrl: './entitlement-dto-card.html',
  styleUrl: './entitlement-dto-card.css',
})
export class EntitlementDtoCard {
  entitlementDto = input.required<EntitlementDTO>();
  numberOfColumn = input<number>(2);

}
