import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {inject, Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Feature} from '../interface/entity/feature';
import {catchError} from 'rxjs/operators';
import {Subscriber} from '../interface/entity/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  api = inject(ApiClientService);

  getSubscribers(page: number = 1, size = 5): Observable<ListData<Subscriber>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Subscriber>>("/admin/subscribers", params)
      .pipe(
        map(response => {
          return response as ListData<Subscriber>;
        }),
        catchError(error => {
          console.error('Get subscriber error:', error);
          return throwError(() => new Error('Không thể lấy danh sách subscriber'));
        })
      )
  }
}
