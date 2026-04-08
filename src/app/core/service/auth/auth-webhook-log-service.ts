import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../../interface/list-data';
import {WebhookLog} from '../../interface/entity/webhook-log';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AuthWebhookLog} from '../../interface/entity/auth/auth-webhook-log';
import {AuthWebhookLogRequest} from '../../interface/request/auth/auth-webhook-log-request';

@Injectable({
  providedIn: 'root'
})
export class AuthWebhookLogService {
  api = inject(ApiClientService);

  getWebhookLogs(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthWebhookLog>> {

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

    return this.api.get<ListData<AuthWebhookLog>>('/auth/webhook-logs', params);
  }

  getWebhookLog(id: number): Observable<AuthWebhookLog> {
    return this.api.get<AuthWebhookLog>(`/auth/webhook-logs/${id}`).pipe(
      catchError(error => {
        console.error('Get webhook log error:', error);
        return throwError(() => new Error('Cannot get webhook log'));
      })
    );
  }

  update(updatedWebhookLog: AuthWebhookLogRequest, id: number): Observable<AuthWebhookLog> {
    return this.api.put<WebhookLog>(`/auth/webhook-logs/${id}`, updatedWebhookLog).pipe(
      catchError(error => {
        console.error('Update webhook log error:', error);
        return throwError(() => new Error('Update webhook log failed'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/webhook-logs`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Bulk delete failed'));
      })
    );
  }

  deleteWebhookLog(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/webhook-logs/${id}`).pipe(
      catchError(error => {
        console.error('Delete webhook log error:', error);
        return throwError(() => new Error('Delete webhookg log failed'));
      })
    );
  }
}
