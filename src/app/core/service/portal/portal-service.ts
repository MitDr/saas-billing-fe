import {inject, Injectable} from '@angular/core';
import {ApiPortalService} from './api-portal-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../../interface/list-data';
import {PortalSubscription} from '../../interface/portal/portal-subscription';
import {catchError} from 'rxjs/operators';
import {Tenant} from '../../interface/entity/tenant';
import {PortalSubscriber} from '../../interface/portal/portal-subscriber';
import {PortalSubscriberRequest} from '../../interface/request/portal/portal-subscriber-request';

@Injectable({
  providedIn: "root"
})
export class PortalService{
  apiService= inject(ApiPortalService);

  getSubscription(): Observable<ListData<PortalSubscription>>{
    return this.apiService.get<ListData<PortalSubscription>>('/api/subscriber-portal/subscriptions').pipe(
        map(response => {
          return response as ListData<PortalSubscription>;
        }),
      catchError(error => {
        console.error('Get Subscriptions Error', error);
        return throwError(() => new Error('Cannot get subscriptions'));
      })
    )
  }

  getSubscriber(): Observable<PortalSubscriber> {
    return this.apiService.get<PortalSubscriber>('api/subscriber-portal/subscriber').pipe(
      catchError(error => {
        console.error('Get Subscriber Error', error)
        return throwError(() => new Error('Cannot get subscriber'));
      })
    )
  }

  updateSubscriber(request: PortalSubscriberRequest): Observable<PortalSubscriber>{
    return this.apiService.post<PortalSubscriber>('api/subscriber-portal', request).pipe(
      catchError(error => {
        console.error('Update Subscriber Error', error);
        return throwError(() => new Error('Cannot update Subscriber'));
      })
    )
  }
}
