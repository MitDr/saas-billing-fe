import {Component, effect, inject, output, signal} from '@angular/core';
import {AuthTenantService} from '../../../../core/service/auth/auth-tenant-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthTenant} from '../../../../core/interface/entity/auth/auth-tenant';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {TenantCard} from '../../../../shell/components/card/tenant/tenant-card/tenant-card';
import {AuthTenantCard} from '../../../../shell/components/card/auth/auth-tenant-card/auth-tenant-card';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {AuthService} from '../../../../core/service/auth-service';
import {Breadcrumb} from '../../../../shell/components/generic/breadcrumb/breadcrumb';
import {TenantReuseForm} from '../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';
import {TENANT_CREATE_ROUTE_CONSTANT} from '../../../../core/constant/tenant/tenant-create-constant';
import {
  AuthTenantReuseForm
} from '../../../../shell/components/form/auth/auth-tenant-reuse-form/auth-tenant-reuse-form';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {TenantRequest} from '../../../../core/interface/request/tenant-request';
import {AuthTenantRequest} from '../../../../core/interface/request/auth/auth-tenant-request';
import {ChangeOwnerRequest} from '../../../../core/interface/request/auth/change-owner-request';
import {
  AuthSubscriberReuseForm
} from '../../../../shell/components/form/auth/auth-subscriber-reuse-form/auth-subscriber-reuse-form';

@Component({
  selector: 'app-auth-tenant-detail',
  imports: [
    NzSpinComponent,
    AuthTenantCard,
    NzModalModule,
    AuthTenantReuseForm,
    AuthSubscriberReuseForm
  ],
  templateUrl: './auth-tenant-detail.html',
  styleUrl: './auth-tenant-detail.css',
})
export class AuthTenantDetail {
  changeOwner($event: string) {
    const payload: ChangeOwnerRequest = {
      email: $event
    }
    this.tenantService.changeOwner(payload).subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }
  loading = signal(false);
  authService = inject(AuthService);
  tenant = signal<AuthTenant | null>(null);
  isCreator = signal<boolean>(false);
  tenantService = inject(AuthTenantService);
  router = inject(Router);
  isSubmitting = false;
  private fb = inject(NonNullableFormBuilder);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);
  isEditModalOpen = signal(false);

  tenantForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]]
  });
  tenantEditForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor() {
    effect(() => {
      this.loadTenant()
      if (this.tenant()?.creator.username === this.authService.currentUserName){
        this.isCreator.set(true);
      }
    });
  }

  loadTenant() {
    this.loading.set(true);
    this.tenantService.getTenant().subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onRefreshToken() {
    this.loading.set(true);
    this.tenantService.refreshAPIKey().subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.message.success('New API Key is appointed');
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  leaveTenant(){
    this.loading.set(true);
    this.tenantService.leaveTenant().subscribe({
      next: (response) => {
        this.tenant.set(null);
        this.message.success('Leave tenant successfully');
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  updateAccountLink(){
    this.loading.set(true);
    this.tenantService.updateAccountLink().subscribe({
      next: (response) => {
        // this.tenant.set(null);
        this.message.success('Leave tenant successfully');
        this.loading.set(false);
        //Redirect theo link tra ve
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }
  onSubmitted() {
    if (this.tenantForm.valid) {
      this.isSubmitting = true;
      const payload: AuthTenantRequest = {
        name: this.tenantForm.value.name!,
        email: this.tenantForm.value.email!
      };

      this.tenantService.createTenant(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo tenant thành công');
          this.tenantForm.reset();

          setTimeout(() => {
            window.location.reload();
          }, 1000); // optional: delay để user thấy message
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create tenant failed:', err);
          this.message.error('Tạo tenant thất bại');
        }
      })
    }
  }

  onDeleteTenant(){
    this.loading.set(true);
    this.tenantService.deleteTenant().subscribe({
      next: (response) => {
        this.tenant.set(null);
        this.message.success('Delete tenant successfully');
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  openEditModal() {
    effect(() => {
      const currentTenant = this.tenant();
      if (currentTenant){
        this.tenantEditForm.patchValue({
          name: currentTenant.name,
          email: currentTenant.email
        })
      }
      this.isEditModalOpen.set(true);
    });
  }

  onConfirmModal(){
    this.isEditModalOpen.set(false);
    // this.service.update
    this.isSubmitting = true;
    if (this.tenantEditForm.valid){
      const payload: AuthTenantRequest = {
        name: this.tenantEditForm.value.name!,
        email: this.tenantEditForm.value.email!
      }
      this.tenantService.updateTenant(payload, this.tenant()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update tenant successfully');
          this.tenantEditForm.reset();

          this.tenant.set(response);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000); // optional: delay để user thấy message
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update tenant failed:', err);
          this.message.error('Update tenant failed');
        }
      })

    }
  }

  onCloseModal(){
    this.isEditModalOpen.set(false);
  }

  //Todo
  //Remove User From Tenant
    // Make new userDTOcard has delete button
  onRemoveUser($event: string) {
    this.loading.set(true);

    const payload: ChangeOwnerRequest = {
      email: $event
    }
    this.tenantService.removeUserFromTenant(payload).subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.message.success('Delete User successfully');
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}
