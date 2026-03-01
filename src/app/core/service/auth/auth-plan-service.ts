import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {AuthPlanRequest} from '../../interface/request/auth/auth-plan-request';
import {AuthPlan} from '../../interface/entity/auth/auth-plan';

@Injectable({
  providedIn: 'root'
})
export class AuthPlanService {
  api = inject(ApiClientService)

  createPlan(planData: AuthPlanRequest, imageFile?: File): Observable<AuthPlan> {
    const formData = new FormData();

    // Thêm các field JSON vào FormData
    formData.append('name', planData.name);
    formData.append('status', planData.status);
    if (planData.planGroupId !== null && planData.planGroupId !== undefined) {
      formData.append('planGroupId', planData.planGroupId.toString());
    }
    if (planData.features && planData.features.length > 0) {
      planData.features.forEach(id => formData.append('features', id.toString()));
    }
    if (planData.prices && planData.prices.length > 0) {
      planData.prices.forEach(id => formData.append('prices', id.toString()));
    }

    // Thêm file image nếu có
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    // Gửi FormData (không cần header Content-Type, Angular tự set multipart)
    return this.api.post<AuthPlan>('/auth/plans', formData).pipe(
      catchError(error => {
        console.error('Create plan error:', error);
        return throwError(() => new Error('Tạo plan thất bại'));
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

  update(updatedPlan: AuthPlanRequest, id: number): Observable<AuthPlan> {
    console.log(updatedPlan)
    return this.api.put<AuthPlan>(`/auth/plans/${id}`, updatedPlan).pipe(
      catchError(error => {
        console.error('Update plans error:', error);
        return throwError(() => new Error('Cập nhật plans thất bại'));
      })
    );
  }

  updatePlan(planId: number, planData: AuthPlanRequest, imageFile?: File): Observable<AuthPlan> {


    const formData = new FormData();

    // Thêm các field bắt buộc
    formData.append('name', planData.name);
    formData.append('status', planData.status);

    // Optional fields
    if (planData.planGroupId !== null && planData.planGroupId !== undefined) {
      formData.append('planGroupId', planData.planGroupId.toString());
    }

    // Mảng features/prices (backend hỗ trợ append nhiều lần với cùng key)
    if (planData.features && planData.features.length > 0) {
      planData.features.forEach(id => formData.append('features', id.toString()));
    }

    if (planData.prices && planData.prices.length > 0) {
      planData.prices.forEach(id => formData.append('prices', id.toString()));
    }


    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    } else {
      formData.append('image', new Blob([]), '');
    }


    // Log FormData để debug
    console.group('FormData gửi lên update plan');
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value);
    }
    console.groupEnd();

    return this.api.put<AuthPlan>(`/auth/plans/${planId}`, formData).pipe(
      catchError(error => {
        console.error('Update plan error:', error);
        return throwError(() => new Error('Cập nhật plan thất bại'));
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
