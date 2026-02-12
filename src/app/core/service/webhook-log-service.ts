import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Feature} from '../interface/entity/feature';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {WebhookLog} from '../interface/entity/webhook-log';

@Injectable({
  providedIn: 'root'
})
export class WebhookLogService {
  api = inject(ApiClientService);

  getWebhookLog(page: number = 1, size: number = 5): Observable<ListData<WebhookLog>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<WebhookLog>>("/admin/webhook-logs", params)
      .pipe(
        map(response => {
          return response as ListData<WebhookLog>;
        }),
        catchError(error => {
          console.error('Get webhook logs error:', error);
          return throwError(() => new Error('Không thể lấy danh sách webhook logs'));
        })
      )

    // return this.http.get<any>(this.apiUrl, {headers, params}).pipe(
    //   map(response => {
    //     // API của bạn trả { data: { content: ..., page: ..., ... } }
    //     return response.content as ListData<User>;
    //   }),
    //   catchError(error => {
    //     console.error('Get users error:', error);
    //     return throwError(() => new Error('Không thể lấy danh sách user'));
    //   })
    // );
  }


}
