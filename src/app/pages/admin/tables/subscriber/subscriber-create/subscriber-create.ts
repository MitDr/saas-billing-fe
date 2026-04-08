import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Router} from '@angular/router';
import {SUBSCRIBER_ROUTE_CONSTANT} from '../../../../../core/constant/subscriber/subscriber-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  SubscriberReuseForm
} from '../../../../../shell/components/form/admin/subscriber-reuse-form/subscriber-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {SubscriberRequest} from '../../../../../core/interface/request/subscriber-request';

@Component({
  selector: 'app-subscriber-create',
  imports: [
    Breadcrumb,
    SubscriberReuseForm,
    NzModalModule
  ],
  templateUrl: './subscriber-create.html',
  styleUrl: './subscriber-create.css',
})
export class SubscriberCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  route = SUBSCRIBER_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  tenantService = inject(TenantService);
  subscriberService = inject(SubscriberService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  subscriberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    // customerId: [''],
    tenantId: [null, [Validators.required]],
  })

  ngOnInit(): void {
    this.loadAllTenant()
  }

  loadAllTenant() {
    this.tenantService.getAllTenants().subscribe({
      next: (response) => {
        const tenants = response.content || [];
        this.availableTenant.set(tenants);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Cannot load tenant');
      }
    });
  }

  onSubmitted() {
    console.log(this.subscriberForm.value)
    if (this.subscriberForm.valid) {
      const payload: SubscriberRequest = {
        name: this.subscriberForm.value.name!,
        email: this.subscriberForm.value.email!,
        tenantId: this.subscriberForm.value.tenantId!,
      }

      // const customerId = this.subscriberForm.value.customerId as string;
      // if (customerId) {
      //   Object.assign(payload, {customerId})
      // }

      console.log(payload);
      this.subscriberService.createSubscriber(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Create subscription successfully');
          this.subscriberForm.reset();
          this.router.navigate(['/admin/tables/subscribers']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create subscriber failed:', err);
          this.message.error('Create subscriber failed');
        }
      })

    }
  }
}
