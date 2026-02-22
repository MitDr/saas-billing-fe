import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {catchError} from 'rxjs/operators';
import {Feature} from '../interface/entity/feature';
import {HttpParams} from '@angular/common/http';
import {FeatureRequest} from '../interface/request/feature-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  api = inject(ApiClientService);

  createFeature(request: FeatureRequest): Observable<Feature> {
    return this.api.post<Feature>('/admin/features', request).pipe(
      catchError(error => {
        console.error('Create feature error:', error);
        return throwError(() => new Error('Tạo feature thất bại'));
      })
    );
  }

  getFeatures(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Feature>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    if (softDelete !== null && softDelete !== undefined) {
      params = params.set('softDelete', softDelete.toString());
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<Feature>>('/admin/features', params);
  }

  getAllFeatures(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Feature>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', 'true');

    if (search) {
      params = params.set('search', search);
    }

    if (softDelete !== null && softDelete !== undefined) {
      params = params.set('softDelete', softDelete.toString());
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<Feature>>('/admin/features', params);
  }

  getFeature(id: number): Observable<Feature> {
    return this.api.get<Feature>(`/admin/features/${id}`).pipe(
      catchError(error => {
        console.error('Get feature error:', error);
        return throwError(() => new Error('Không thể lấy feature'));
      })
    );
  }

  update(updatedFeature: FeatureRequest, id: number): Observable<Feature> {
    return this.api.put<Feature>(`/admin/features/${id}`, updatedFeature).pipe(
      catchError(error => {
        console.error('Update feature error:', error);
        return throwError(() => new Error('Cập nhật feature thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/features`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/features/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteFeature(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/features/${id}`).pipe(
      catchError(error => {
        console.error('Delete feature error:', error);
        return throwError(() => new Error('Xóa feature thất bại'));
      })
    );
  }
}
