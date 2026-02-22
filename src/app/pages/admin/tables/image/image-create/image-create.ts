import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {IMAGE_ROUTE_CONSTANT} from '../../../../../core/constant/image/image-list-constant';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {ImageService} from '../../../../../core/service/image-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {ImageReuseForm} from '../../../../../shell/components/form/admin/image-reuse-form/image-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {ImageRequest} from '../../../../../core/interface/request/image-request';

@Component({
  selector: 'app-image-create',
  imports: [
    Breadcrumb,
    FeatureReuseForm,
    ImageReuseForm,
    NzModalModule,

  ],
  templateUrl: './image-create.html',
  styleUrl: './image-create.css',
})
export class ImageCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  route = IMAGE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  tenantService = inject(TenantService);
  imageService = inject(ImageService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  imageForm = this.fb.group({
    url: ['', [Validators.required]],
    publicId: ['', [Validators.required]],
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

    if (this.imageForm.valid) {
      this.isSubmitting = true;
      const payload: ImageRequest = {
        url: this.imageForm.value.url!,
        publicId: this.imageForm.value.publicId!,
        tenantId: this.imageForm.value.tenantId!
      }

      this.imageService.createImage(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo image thành công');
          this.imageForm.reset();
          this.router.navigate(['/admin/tables/images']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create image failed:', err);
          this.message.error('Tạo image thất bại');
        }
      })
    }
  }
}
