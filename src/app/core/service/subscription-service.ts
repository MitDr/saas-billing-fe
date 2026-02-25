import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Subscription} from '../interface/entity/subscription';
import {SubscriptionRequest} from '../interface/request/subscription-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  api = inject(ApiClientService);

  createSubscription(request: SubscriptionRequest): Observable<Subscription> {
    return this.api.post<Subscription>('/admin/subscriptions', request).pipe(
      catchError(error => {
        console.error('Create subscription error:', error);
        return throwError(() => new Error('Tạo subscription thất bại'));
      })
    );
  }

  getSubscriptions(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Subscription>> {

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

    return this.api.get<ListData<Subscription>>('/admin/subscriptions', params);
  }

  getAllSubscriptions(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Subscription>> {

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

    return this.api.get<ListData<Subscription>>('/admin/subscriptions', params);
  }

  getSubscription(id: number): Observable<Subscription> {
    return this.api.get<Subscription>(`/admin/subscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Get subscription error:', error);
        return throwError(() => new Error('Không thể lấy subscription'));
      })
    );
  }

  update(updatedSubscription: SubscriptionRequest, id: number): Observable<Subscription> {
    return this.api.put<Subscription>(`/admin/subscriptions/${id}`, updatedSubscription).pipe(
      catchError(error => {
        console.error('Update subscription error:', error);
        return throwError(() => new Error('Cập nhật subscription thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/subscriptions`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/subscriptions/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteSubscription(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/subscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Delete subscription error:', error);
        return throwError(() => new Error('Xóa subscription thất bại'));
      })
    );
  }
}
