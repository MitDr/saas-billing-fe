import {Component, input} from '@angular/core';
import {TenantDTO} from '../../../../../core/interface/DTO/TenantDTO';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-tenant-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './tenant-dto-card.html',
  styleUrl: './tenant-dto-card.css',
})
export class TenantDtoCard {
  tenant = input.required<TenantDTO>();
  numberOfColumn = input<number>(2);
  
}
