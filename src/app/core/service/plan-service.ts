import {ApiClientService} from './api-client-service';
import {inject, Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Plan} from '../interface/entity/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService  {
  api = inject(ApiClientService)

  getPlans(page: number = 0, size: number = 5): Observable<ListData<Plan>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')

    return this.api.get<ListData<Plan>>('/admin/plans', params)
      .pipe(
        map(response => {
          return response as ListData<Plan>;
        }),
        catchError(error => {
          console.error('Get plans error', error);
          return throwError(() => new Error('Không thể lấy danh sách plan'))
        })
      )
  }
}
