import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {IMAGE_ROUTE_CONSTANT} from '../../../../../core/constant/image/image-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {ImageService} from '../../../../../core/service/image-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Image} from '../../../../../core/interface/entity/image';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {ImageRequest} from '../../../../../core/interface/request/image-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {ImageReuseForm} from '../../../../../shell/components/form/admin/image-reuse-form/image-reuse-form';

@Component({
  selector: 'app-image-edit',
  imports: [
    NzModalModule,
    Breadcrumb,
    EntitlementReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    ImageReuseForm,
  ],
  templateUrl: './image-edit.html',
  styleUrl: './image-edit.css',
})
export class ImageEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  routing = IMAGE_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  imageService = inject(ImageService);
  message = inject(NzMessageService);
  initTenant = signal<Tenant | null>(null);
  image = signal<Image | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  imageForm = this.fb.group({
    url: ['', [Validators.required]],
    publicId: ['', [Validators.required]],
    tenantId: [null as number | null, [Validators.required]],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadImage(+id);
      }
    });
    effect(() => {
      const currentImage = this.image();
      if (currentImage) {
        this.imageForm.patchValue({
          url: currentImage.url,
          publicId: currentImage.publicId,
          tenantId: currentImage.tenant?.id || null,
        });
        this.getTenant(currentImage?.tenant.id!);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
  }

  loadImage(id: number) {
    this.loading.set(true);
    this.imageService.getImage(id).subscribe({
      next: (response) => {
        this.image.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
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

  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
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

      this.imageService.update(payload, this.image()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update image thành công');
          this.imageForm.reset();
          this.router.navigate(['/admin/tables/images']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update image failed:', err);
          this.message.error('Update image thất bại');
        }
      })
    }
  }

}
