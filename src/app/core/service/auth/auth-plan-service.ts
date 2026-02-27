import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {PlanRequest} from '../../interface/request/plan-request';
import {Observable, throwError} from 'rxjs';
import {Plan} from '../../interface/entity/plan';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {AuthPlanRequest} from '../../interface/request/auth/auth-plan-request';
import {AuthPlan} from '../../interface/entity/auth/auth-plan';

@Injectable({
  providedIn: 'root'
})
export class AuthPlanService{
  api = inject(ApiClientService)

  createPlan(request: AuthPlanRequest): Observable<AuthPlan> {
    return this.api.post<AuthPlan>(`/auth/plans`, request).pipe(
      catchError(error => {
        console.error('Create plans error:', error);
        return throwError(() => new Error('Tạo plans thất bại'));
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
  ): Observable<ListData<AuthPlan>> {

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

    return this.api.get<ListData<AuthPlan>>('/auth/plans', params);
  }

  getAllPlans(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthPlan>> {

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

    return this.api.get<ListData<AuthPlan>>('/auth/plans', params);
  }

  getPlan(id: number): Observable<AuthPlan> {
    return this.api.get<AuthPlan>(`/auth/plans/${id}`).pipe(
      catchError(error => {
        console.error('Get plan error:', error);
        return throwError(() => new Error('Không thể lấy plan'));
      })
    );
  }

  update(updatedPlan: PlanRequest, id: number): Observable<AuthPlan> {
    console.log(updatedPlan)
    return this.api.put<AuthPlan>(`/auth/plans/${id}`, updatedPlan).pipe(
      catchError(error => {
        console.error('Update plans error:', error);
        return throwError(() => new Error('Cập nhật plans thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/plans`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/auth/plans/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deletePlan(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/plans/${id}`).pipe(
      catchError(error => {
        console.error('Delete plans error:', error);
        return throwError(() => new Error('Xóa plans thất bại'));
      })
    );
  }
}
