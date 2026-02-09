import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {
  //
  // constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  // }
  //
  // get(key: string) {
  //   if (!isPlatformBrowser(this.platformId)) return null;
  //   console.log(`[STORAGE GET] ${key} =`, localStorage.getItem(key));
  //   return localStorage.getItem(key);
  // }
  //
  // set(key: string, value: string) {
  //   if (!isPlatformBrowser(this.platformId)) return;
  //   console.log(`[STORAGE SET] ${key} =`, value);
  //   localStorage.setItem(key, value);
  // }
  //
  // remove(key: string) {
  //   if (!isPlatformBrowser(this.platformId)) return;
  //   localStorage.removeItem(key);
  // }
  //
  // clear() {
  //   if (!isPlatformBrowser(this.platformId)) return;
  //   localStorage.clear();
  // }
}
