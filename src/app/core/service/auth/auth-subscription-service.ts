import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {SubscriptionRequest} from '../../interface/request/subscription-request';
import {Observable, throwError} from 'rxjs';
import {Subscription} from '../../interface/entity/subscription';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {HttpParams} from '@angular/common/http';
import {AuthSubscriptionRequest} from '../../interface/request/auth/auth-subscription-request';
import {AuthSubscription} from '../../interface/entity/auth/auth-subscription';

@Injectable({
  providedIn: 'root'
})
export class AuthSubscriptionService{
  api = inject(ApiClientService);

  createSubscription(request: AuthSubscriptionRequest): Observable<AuthSubscription> {
    return this.api.post<AuthSubscription>('/auth/subscriptions', request).pipe(
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
  ): Observable<ListData<AuthSubscription>> {

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

    return this.api.get<ListData<AuthSubscription>>('/auth/subscriptions', params);
  }

  getAllSubscriptions(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthSubscription>> {

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

    return this.api.get<ListData<AuthSubscription>>('/auth/subscriptions', params);
  }

  getSubscription(id: number): Observable<AuthSubscription> {
    return this.api.get<AuthSubscription>(`/auth/subscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Get subscription error:', error);
        return throwError(() => new Error('Không thể lấy subscription'));
      })
    );
  }

  update(updatedSubscription: AuthSubscriptionRequest, id: number): Observable<AuthSubscription> {
    return this.api.put<AuthSubscription>(`/auth/subscriptions/${id}`, updatedSubscription).pipe(
      catchError(error => {
        console.error('Update subscription error:', error);
        return throwError(() => new Error('Cập nhật subscription thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/subscriptions`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/auth/subscriptions/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteSubscription(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/subscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Delete subscription error:', error);
        return throwError(() => new Error('Xóa subscription thất bại'));
      })
    );
  }
}
