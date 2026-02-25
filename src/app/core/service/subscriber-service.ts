import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {inject, Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Subscriber} from '../interface/entity/subscriber';
import {SubscriberRequest} from '../interface/request/subscriber-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  api = inject(ApiClientService);

  createSubscriber(request: SubscriberRequest): Observable<Subscriber> {
    return this.api.post<Subscriber>('/admin/subscribers', request).pipe(
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
  ): Observable<ListData<Subscriber>> {

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

    return this.api.get<ListData<Subscriber>>('/admin/subscribers', params);
  }

  getAllSubscribers(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Subscriber>> {

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

    return this.api.get<ListData<Subscriber>>('/admin/subscribers', params);
  }

  getSubscriber(id: number): Observable<Subscriber> {
    return this.api.get<Subscriber>(`/admin/subscribers/${id}`).pipe(
      catchError(error => {
        console.error('Get subscriber error:', error);
        return throwError(() => new Error('Không thể lấy subscriber'));
      })
    );
  }

  update(updatedSubscriber: SubscriberRequest, id: number): Observable<Subscriber> {
    return this.api.put<Subscriber>(`/admin/subscribers/${id}`, updatedSubscriber).pipe(
      catchError(error => {
        console.error('Update subscriber error:', error);
        return throwError(() => new Error('Cập nhật subscriber thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/subscribers`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/subscribers/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteSubscriber(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/subscribers/${id}`).pipe(
      catchError(error => {
        console.error('Delete subscriber error:', error);
        return throwError(() => new Error('Xóa subscriber thất bại'));
      })
    );
  }
}
