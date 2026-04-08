import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {AuthWebhookEndpointRequest} from '../../interface/request/auth/auth-webhook-endpoint-request';
import {AuthWebhookEndpoint} from '../../interface/entity/auth/auth-webhook-endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthWebhookEndpointService {
  api = inject(ApiClientService);

  createWebhookEndpoint(createWebhookEndpoint: AuthWebhookEndpointRequest): Observable<AuthWebhookEndpoint> {
    return this.api.post<AuthWebhookEndpoint>('/auth/webhook-endpoints', createWebhookEndpoint).pipe(
      catchError(error => {
        console.error('Create webhook endpoint error:', error);
        return throwError(() => new Error('Create webhook endpoint failed'));
      })
    );
  }

  getWebhookEndpoints(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthWebhookEndpoint>> {

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

    return this.api.get<ListData<AuthWebhookEndpoint>>('/auth/webhook-endpoints', params);
  }

  getWebhookEndpoint(id: number): Observable<AuthWebhookEndpoint> {
    return this.api.get<AuthWebhookEndpoint>(`/auth/webhook-endpoints/${id}`).pipe(
      catchError(error => {
        console.error('Get webhook endpoint error:', error);
        return throwError(() => new Error('Cannot get webhook endpoint'));
      })
    );
  }

  update(updateWebhookEndpoint: AuthWebhookEndpointRequest, id: number): Observable<AuthWebhookEndpoint> {
    return this.api.put<AuthWebhookEndpoint>(`/auth/webhook-endpoints/${id}`, updateWebhookEndpoint).pipe(
      catchError(error => {
        console.error('Update user error:', error);
        return throwError(() => new Error('Update user failed'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/webhook-endpoints`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Bulk delete failed'));
      })
    );
  }

  deleteWebhookEndpoint(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/webhook-endpoints/${id}`).pipe(
      catchError(error => {
        console.error('Delete webhook endpoint error:', error);
        return throwError(() => new Error('Delete webhook endpoint failed'));
      })
    );
  }
}
