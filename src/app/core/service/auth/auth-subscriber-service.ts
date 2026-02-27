import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {Subscriber} from '../../interface/entity/subscriber';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {AuthSubscriberRequest} from '../../interface/request/auth/auth-subscriber-request';
import {AuthSubscriber} from '../../interface/entity/auth/auth-subscriber';

@Injectable({
  providedIn: 'root'
})
export class AuthSubscriberService{
  api = inject(ApiClientService);

  createSubscriber(request: AuthSubscriberRequest): Observable<AuthSubscriber> {
    return this.api.post<AuthSubscriber>('/auth/subscribers', request).pipe(
      catchError(error => {
        console.error('Create subscriber error:', error);
        return throwError(() => new Error('Tạo subscriber thất bại'));
      })
    );
  }

  getSubscribers(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthSubscriber>> {

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

    return this.api.get<ListData<AuthSubscriber>>('/auth/subscribers', params);
  }

  getAllSubscribers(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthSubscriber>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', true);

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

    return this.api.get<ListData<AuthSubscriber>>('/auth/subscribers', params);
  }

  getSubscriber(id: number): Observable<AuthSubscriber> {
    return this.api.get<Subscriber>(`/auth/subscribers/${id}`).pipe(
      catchError(error => {
        console.error('Get subscriber error:', error);
        return throwError(() => new Error('Không thể lấy subscriber'));
      })
    );
  }

  update(updatedSubscriber: AuthSubscriberRequest, id: number): Observable<AuthSubscriber> {
    return this.api.put<AuthSubscriber>(`/auth/subscribers/${id}`, updatedSubscriber).pipe(
      catchError(error => {
        console.error('Update subscriber error:', error);
        return throwError(() => new Error('Cập nhật subscriber thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/subscribers`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/auth/subscribers/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteSubscriber(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/subscribers/${id}`).pipe(
      catchError(error => {
        console.error('Delete subscriber error:', error);
        return throwError(() => new Error('Xóa subscriber thất bại'));
      })
    );
  }
}
