import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {PlanGroup} from '../interface/entity/plan-group';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Feature} from '../interface/entity/feature';

@Injectable({
  providedIn: 'root'
})
export class PlanGroupService{
  api = inject(ApiClientService)

  getPlanGroups(page:number = 0, size: number = 5 ): Observable<ListData<PlanGroup>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')

    return this.api.get<ListData<PlanGroup>>("/admin/plan-groups", params)
      .pipe(
        map(response => {
          return response as ListData<PlanGroup>;
        }),
        catchError(error => {
          console.error('Get plan groups error:', error);
          return throwError(() => new Error('Không thể lấy danh sách plan groups'));
        })
      )

  }
}
