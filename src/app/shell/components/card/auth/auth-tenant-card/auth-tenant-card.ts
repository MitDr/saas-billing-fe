import {Component, input} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';

@Component({
  selector: 'app-auth-tenant-card',
  imports: [],
  templateUrl: './auth-tenant-card.html',
  styleUrl: './auth-tenant-card.css',
})
export class AuthTenantCard {
  tenant = input.required<AuthTenant>();
  // tenantService = inject(AuthTenantService);
}
