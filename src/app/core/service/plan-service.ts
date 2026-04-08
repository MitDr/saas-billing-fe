import {ApiClientService} from './api-client-service';
import {inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Plan} from '../interface/entity/plan';
import {PlanRequest} from '../interface/request/plan-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  api = inject(ApiClientService)

  createPlan(request: PlanRequest): Observable<Plan> {
    return this.api.post<Plan>(`/admin/plans`, request).pipe(
      catchError(error => {
        console.error('Create plans error:', error);
        return throwError(() => new Error('Create plans failed'));
      })
    );
  }

  getPlans(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Plan>> {

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

    return this.api.get<ListData<Plan>>('/admin/plans', params);
  }

  getAllPlans(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Plan>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', true);

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

    return this.api.get<ListData<Plan>>('/admin/plans', params);
  }

  getPlan(id: number): Observable<Plan> {
    return this.api.get<Plan>(`/admin/plans/${id}`).pipe(
      catchError(error => {
        console.error('Get plan error:', error);
        return throwError(() => new Error('Cannot get plan'));
      })
    );
  }

  update(updatedPlan: PlanRequest, id: number): Observable<Plan> {
    console.log(updatedPlan)
    return this.api.put<Plan>(`/admin/plans/${id}`, updatedPlan).pipe(
      catchError(error => {
        console.error('Update plans error:', error);
        return throwError(() => new Error('Update plans failed'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/plans`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Bulk delete failed'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/plans/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Bulk soft delete failed'));
      })
    );
  }

  deletePlan(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/plans/${id}`).pipe(
      catchError(error => {
        console.error('Delete plans error:', error);
        return throwError(() => new Error('Delete plans failed'));
      })
    );
  }
}
