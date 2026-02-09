import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {catchError} from 'rxjs/operators';
import {Feature} from '../interface/entity/feature';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  api = inject(ApiClientService);

  getFeature(page: number = 0, size: number = 5): Observable<ListData<Feature>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Feature>>("/admin/features", params)
      .pipe(
        map(response => {
          // API của bạn trả { data: { content: ..., page: ..., ... } }
          return response as ListData<Feature>;
        }),
        catchError(error => {
          console.error('Get users error:', error);
          return throwError(() => new Error('Không thể lấy danh sách user'));
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
