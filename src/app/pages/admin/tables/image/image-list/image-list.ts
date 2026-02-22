import {Component, inject, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Image} from '../../../../../core/interface/entity/image';
import {IMAGE_ROUTE_CONSTANT} from '../../../../../core/constant/image/image-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {ImageService} from '../../../../../core/service/image-service';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {ImageRequest} from '../../../../../core/interface/request/image-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-image-list',
  imports: [
    EditableDataTable,
    NzButtonComponent,
    RouterLink,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './image-list.html',
  styleUrl: './image-list.css',
})
export class ImageList extends GenericListComponent<Image, ImageRequest> {
  imagePage = signal<ListData<Image> | null>(null);
  checked = false;
  createRoute = '/admin/tables/images/create'
  imageListRouting = IMAGE_ROUTE_CONSTANT;
  private imageService = inject(ImageService);

  getDataPage() {
    return this.imagePage;
  }

  override getColumns(): ColumnConfig<Image>[] {
    return [
      {key: 'id', title: 'Id', editable: false, type: "text"},
      {key: 'url', title: 'URL', editable: true, type: 'text'},
      {key: 'publicId', title: 'Public Id', editable: true, type: 'text'},
      {key: 'createdDate', title: 'Created Date', editable: false, type: 'date-time'},
      {key: 'modifiedDate', title: 'Modified Date', editable: false, type: 'date-time'},
      {key: 'tenant', title: 'Tenant\'s Name', editable: false, type: "custom", path: 'tenant.name'}

    ];
  }

  getCreateRoute() {
    return this.createRoute;
  }

  getRoutingConstant() {
    return this.imageListRouting;
  }

  getService() {
    return this.imageService;
  }

  onSearchChange(value: string) {
    this.search.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  onSoftDeleteChange(value: boolean | null) {
    this.softDeleteFilter.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  onTenantChange(value: number | null) {
    this.tenantFilter.set(value);
    this.currentPage.set(1);
    this.syncUrl({page: 1});
  }

  protected loadData(page: number, size: number, search?: string, softDelete?: boolean | null, tenantId?: number | null, sort?: string) {
    this.loading.set(true);
    this.imageService.getImages(page, size, search, tenantId).subscribe({ // No sort for Price
      next: (response) => {
        // Sync queryParams (nếu cần, copy từ cũ)
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page,
            size: this.pageSize(),
            search: this.search() || null,
            softDelete: this.softDeleteFilter(),
            tenantId: this.tenantFilter()
          },
          queryParamsHandling: 'merge'
        });
        this.imagePage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách images');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(image: Image): ImageRequest {
    return {
      url: image.url,
      publicId: image.publicId,
      tenantId: image.tenant.id
    };
  }
}
