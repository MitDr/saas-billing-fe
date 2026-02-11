import {Component, effect, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Image} from '../../../../../core/interface/entity/image';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {IMAGE_ROUTE_CONSTANT} from '../../../../../core/constant/image/image-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ImageService} from '../../../../../core/service/image-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-image-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './image-list.html',
  styleUrl: './image-list.css',
})
export class ImageList {
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  imagePage = signal<ListData<Image> | null>(null);
  loading = signal(false);

  checked = false;
  createRoute = '/admin/tables/images/create'
  imageListRouting = IMAGE_ROUTE_CONSTANT;

  protected readonly IMAGE_COLUMNS: ColumnConfig<Image>[] =[
    {key: 'id', title: 'Id', editable: false, type: "text"},
    {key: 'url', title: 'URL', editable: true, type: 'text'},
    {key: 'publicId', title: 'Public Id', editable: true, type: 'text'},
    {key: 'createdDate', title: 'Created Date', editable: false, type: 'date-time'},
    {key: 'modifiedDate', title: 'Modified Date', editable: false, type: 'date-time'},
    {key: 'tenant', title: 'Tenant\'s Name', editable: false, type:"custom", path:'tenant.name'}
  ]

  private imageService = inject(ImageService);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadImages(page, size);
    });
  }

  private loadImages(page: number, size: number) {
    this.loading.set(true);

    this.imageService.getImages(page, size).subscribe({  // page 0-based cho backend
      next: (response) => {
        // console.log('[API] Features loaded:', response);
        this.imagePage.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        // console.error('[API] Load features error:', err);
        this.message.error('Không thể tải danh sách image');
        this.loading.set(false);
      }
    });
  }

  onPageChange(newPage: number) {
    console.log('[PAGE] Changed to:', newPage);
    this.currentPage.set(newPage);
    // Không cần gọi loadFeatures nữa → effect tự chạy
  }

  // Khi đổi size
  onSizeChange(newSize: number) {
    console.log('[SIZE] Changed to:', newSize);
    this.pageSize.set(newSize);
    this.currentPage.set(1); // reset về trang 1
    // Effect tự reload
  }

  onSaveRow(updateImage: Image) {
    // this.userService.updateUser(updatedUser).subscribe({
    //   next: () => {
    //     this.message.success('Cập nhật thành công');
    //     this.loadUsers();  // ← gọi lại API load toàn bộ list
    //   },
    //   error: () => {
    //     this.message.error('Cập nhật thất bại');
    //     // Optional: rollback cache nếu cần
    //   }
    // });
    console.log('calling api')
  }

  // Bulk delete (tương tự)
  onBulkDelete(ids: number[]) {
    // if (ids.length === 0) return;
    //
    // this.modal.confirm({
    //   nzTitle: 'Xác nhận xóa',
    //   nzContent: `Xóa ${ids.length} feature?`,
    //   nzOkText: 'Xóa',
    //   nzOkDanger: true,
    //   nzOnOk: () => {
    //     this.featureService.bulkDelete(ids).subscribe({
    //       next: () => {
    //         this.message.success('Xóa thành công');
    //         this.currentPage.set(this.currentPage()); // trigger reload
    //       },
    //       error: () => this.message.error('Xóa thất bại')
    //     });
    //   }
    // });
  }
}
