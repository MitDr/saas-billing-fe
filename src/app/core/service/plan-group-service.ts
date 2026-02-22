import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {PlanGroup} from '../interface/entity/plan-group';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {PlanGroupRequest} from '../interface/request/plan-group-request';

@Injectable({
  providedIn: 'root'
})
export class PlanGroupService {
  api = inject(ApiClientService)

  createPlanGroup(request: PlanGroupRequest) {
    return this.api.post('/admin/plan-groups', request).pipe(
      catchError(error => {
        console.error('create plan group error:', error);
        return throwError(() => new Error('Không tạo lấy plan group'));
      })
    );
  }

  getPlanGroups(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<PlanGroup>> {

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

    return this.api.get<ListData<PlanGroup>>('/admin/plan-groups', params);
  }

  getAllPlanGroups(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<PlanGroup>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', true);

    if (search) {
      params = params.set('search', search);
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<PlanGroup>>('/admin/plan-groups', params);
  }

  getPlanGroup(id: number): Observable<PlanGroup> {
    return this.api.get<PlanGroup>(`/admin/plan-groups/${id}`).pipe(
      catchError(error => {
        console.error('Get plan group error:', error);
        return throwError(() => new Error('Không thể lấy plan group'));
      })
    );
  }


  update(updatedPlanGroup: PlanGroupRequest, id: number): Observable<PlanGroup> {
    return this.api.put<PlanGroup>(`/admin/plan-groups/${id}`, updatedPlanGroup).pipe(
      catchError(error => {
        console.error('Update plan group error:', error);
        return throwError(() => new Error('Cập nhật plan group thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/plan-groups`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deletePlanGroup(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/plan-groups/${id}`).pipe(
      catchError(error => {
        console.error('Delete feature error:', error);
        return throwError(() => new Error('Xóa feature thất bại'));
      })
    );
  }
}
