import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Image} from '../interface/entity/image';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  api = inject(ApiClientService)

  getImages(page: number = 1, size: number = 5): Observable<ListData<Image>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Image>>("/admin/images", params)
      .pipe(
        map(response => {
          return response as ListData<Image>;
        }),
        catchError(error => {
          console.error('Get images error:', error);
          return throwError(() => new Error('Không thể lấy danh sách image'));
        })
      )
  }
}
