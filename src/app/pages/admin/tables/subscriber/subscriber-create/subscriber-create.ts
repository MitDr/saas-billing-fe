import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {Router} from '@angular/router';
import {SUBSCRIBER_ROUTE_CONSTANT} from '../../../../../core/constant/subscriber/subscriber-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {
  SubscriberReuseForm
} from '../../../../../shell/components/form/admin/subscriber-reuse-form/subscriber-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-subscriber-create',
  imports: [
    Breadcrumb,
    FeatureReuseForm,
    SubscriberReuseForm,
    NzModalModule
  ],
  templateUrl: './subscriber-create.html',
  styleUrl: './subscriber-create.css',
})
export class SubscriberCreate implements OnInit{
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
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  onSubmitted() {
    console.log(this.subscriberForm.value)
  }
}
