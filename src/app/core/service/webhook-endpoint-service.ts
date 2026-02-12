import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {WebhookEndpoint} from '../interface/entity/webhook-endpoint';
import {ListData} from '../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {Feature} from '../interface/entity/feature';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebhookEndpointService{
  api = inject(ApiClientService);

  getWebhookEndpoints(page: number = 1, size: number = 5): Observable<ListData<WebhookEndpoint>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<WebhookEndpoint>>("/admin/webhook-endpoints", params)
      .pipe(
        map(response => {
          return response as ListData<WebhookEndpoint>;
        }),
        catchError(error => {
          console.error('Get webhook endpoints error:', error);
          return throwError(() => new Error('Không thể lấy danh sách webhook endpoints'));
        })
      )
  }
}
