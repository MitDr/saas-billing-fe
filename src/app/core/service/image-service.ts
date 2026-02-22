import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Image} from '../interface/entity/image';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ImageRequest} from '../interface/request/image-request';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  api = inject(ApiClientService)

  createImage(request: ImageRequest): Observable<Image> {
    return this.api.post<Image>('/admin/images', request).pipe(
      catchError(error => {
        console.error('Create image error:', error);
        return throwError(() => new Error('Tạo image thất bại'));
      })
    );
  }

  getImages(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Image>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<Image>>('/admin/images', params);
  }


  getImage(id: number): Observable<Image> {
    return this.api.get<Image>(`/admin/images/${id}`).pipe(
      catchError(error => {
        console.error('Get image error:', error);
        return throwError(() => new Error('Không thể lấy image'));
      })
    );
  }

  update(updatedImage: ImageRequest, id: number): Observable<Image> {
    return this.api.put<Image>(`/admin/images/${id}`, updatedImage).pipe(
      catchError(error => {
        console.error('Update image error:', error);
        return throwError(() => new Error('Cập nhật image thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/images`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deleteImage(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/images/${id}`).pipe(
      catchError(error => {
        console.error('Delete image error:', error);
        return throwError(() => new Error('Xóa image thất bại'));
      })
    );
  }
}
