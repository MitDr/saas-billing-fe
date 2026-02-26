import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {FeatureRequest} from '../../interface/request/feature-request';
import {Observable, throwError} from 'rxjs';
import {Feature} from '../../interface/entity/feature';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {AuthFeatureRequest} from '../../interface/request/auth/auth-feature-request';
import {AuthFeature} from '../../interface/entity/auth/auth-feature';

@Injectable({
  providedIn: 'root'
})
export class AuthFeatureService{
  api = inject(ApiClientService);

  createFeature(request: AuthFeatureRequest): Observable<AuthFeature> {
    return this.api.post<AuthFeature>('/auth/features', request).pipe(
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
    sort: string = 'id,asc'
  ): Observable<ListData<AuthFeature>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ListData<AuthFeature>>('/auth/features', params);
  }

  getAllFeatures(
    page: number = 1,
    size: number = 5,
    search?: string,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthFeature>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', 'true');

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ListData<AuthFeature>>('/auth/features', params);
  }

  getFeature(id: number): Observable<AuthFeature> {
    return this.api.get<AuthFeature>(`/auth/features/${id}`).pipe(
      catchError(error => {
        console.error('Get feature error:', error);
        return throwError(() => new Error('Không thể lấy feature'));
      })
    );
  }

  update(updatedFeature: AuthFeatureRequest, id: number): Observable<AuthFeature> {
    return this.api.put<AuthFeature>(`/auth/features/${id}`, updatedFeature).pipe(
      catchError(error => {
        console.error('Update feature error:', error);
        return throwError(() => new Error('Cập nhật feature thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/features`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deleteFeature(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/features/${id}`).pipe(
      catchError(error => {
        console.error('Delete feature error:', error);
        return throwError(() => new Error('Xóa feature thất bại'));
      })
    );
  }
}
