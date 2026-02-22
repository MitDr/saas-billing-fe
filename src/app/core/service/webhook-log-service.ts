import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {WebhookLog} from '../interface/entity/webhook-log';
import {WebhookLogRequest} from '../interface/request/webhook-log-request';

@Injectable({
  providedIn: 'root'
})
export class WebhookLogService {
  api = inject(ApiClientService);

  getWebhookLogs(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<WebhookLog>> {

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

    return this.api.get<ListData<WebhookLog>>('/admin/webhook-logs', params);
  }

  getWebhookLog(id: number): Observable<WebhookLog> {
    return this.api.get<WebhookLog>(`/admin/webhook-logs/${id}`).pipe(
      catchError(error => {
        console.error('Get webhook log error:', error);
        return throwError(() => new Error('Không thể lấy webhook log'));
      })
    );
  }

  update(updatedWebhookLog: WebhookLogRequest, id: number): Observable<WebhookLog> {
    return this.api.put<WebhookLog>(`/admin/webhook-logs/${id}`, updatedWebhookLog).pipe(
      catchError(error => {
        console.error('Update webhook log error:', error);
        return throwError(() => new Error('Cập nhật webhook log thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/webhook-logs`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deleteWebhookLog(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/webhook-logs/${id}`).pipe(
      catchError(error => {
        console.error('Delete webhook log error:', error);
        return throwError(() => new Error('Xóa webhookg log thất bại'));
      })
    );
  }

}
