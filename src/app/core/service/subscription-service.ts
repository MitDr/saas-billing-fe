import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Feature} from '../interface/entity/feature';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Subscription} from '../interface/entity/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService{
  api = inject(ApiClientService);

  getSubscriptions(page: number = 1, size: number = 5): Observable<ListData<Subscription>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Subscription>>("/admin/subscriptions", params)
      .pipe(
        map(response => {
          return response as ListData<Subscription>;
        }),
        catchError(error => {
          console.error('Get subscriptions error:', error);
          return throwError(() => new Error('Không thể lấy danh sách subscriptions'));
        })
      )
  }
}
