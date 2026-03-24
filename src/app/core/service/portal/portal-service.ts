import {inject, Injectable} from '@angular/core';
import {ApiPortalService} from './api-portal-service';
import {map, Observable, throwError} from 'rxjs';
import {PortalSubscription} from '../../interface/portal/portal-subscription';
import {catchError} from 'rxjs/operators';
import {PortalSubscriber} from '../../interface/portal/portal-subscriber';
import {PortalSubscriberRequest} from '../../interface/request/portal/portal-subscriber-request';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class PortalService {
  apiService = inject(ApiPortalService);

  changePaymentMethod(id: number): Observable<string> {
    let param = new HttpParams()
      .set('subscriptionId', id)

    return this.apiService.get<string>('/api/subscriber-portal/change-default-payment', param).pipe(
      catchError(error => {
        console.error('Change payment method error ', error);
        return throwError(() => new Error('Cannot change payment method'));
      })
    )
  }

  getSubscription(): Observable<PortalSubscription[]> {
    return this.apiService.get<PortalSubscription[]>('/api/subscriber-portal/subscriptions').pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Get Subscriptions Error', error);
        return throwError(() => new Error('Cannot get subscriptions'));
      })
    )
  }

  getSubscriber(): Observable<PortalSubscriber> {
    return this.apiService.get<PortalSubscriber>('/api/subscriber-portal/subscribers').pipe(
      catchError(error => {
        console.error('Get Subscriber Error', error)
        return throwError(() => new Error('Cannot get subscriber'));
      })
    )
  }

  updateSubscriber(request: PortalSubscriberRequest): Observable<PortalSubscriber> {
    return this.apiService.post<PortalSubscriber>('/api/subscriber-portal', request).pipe(
      catchError(error => {
        console.error('Update Subscriber Error', error);
        return throwError(() => new Error('Cannot update Subscriber'));
      })
    )
  }
}
