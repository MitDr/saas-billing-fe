import {HttpClient } from "@angular/common/http";
import {computed, inject, Injectable, signal} from '@angular/core';
import { NzMessageService } from "ng-zorro-antd/message";
import {Router} from '@angular/router';
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators';

export interface PortalUser {
  subscriberId: string;
  tenantId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiPortalService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private message = inject(NzMessageService);

  private portalUser = signal<PortalUser | null>(null);

  // Computed tiện lợi
  isPortalLoggedIn = computed(() => !!this.portalUser());
  subscriberId = computed(() => this.portalUser()?.subscriberId);
  tenantId = computed(() => this.portalUser()?.tenantId);

  constructor() {
    this.loadFromStorage();
  }

  loadPortalUser(): Observable<PortalUser> {
    return this.http.get<PortalUser>('/api/portal/current-user').pipe(
      tap(user => {
        this.portalUser.set(user);
        localStorage.setItem('portalUser', JSON.stringify(user));
        console.log('Portal user loaded:', user);
      })
    );
  }

  // Load từ localStorage y(khi refresh page)
  private loadFromStorage() {
    const stored = localStorage.getItem('portalUser');
    if (stored) {
      try {
        const user = JSON.parse(stored) as PortalUser;
        this.portalUser.set(user);
      } catch (e) {
        localStorage.removeItem('portalUser');
      }
    }
  }

  // Logout portal
  logout(): void {
    this.http.post('/api/portal/logout', {}).subscribe({
      next: () => {
        this.portalUser.set(null);
        localStorage.removeItem('portalUser');
        this.message.success('Đã đăng xuất portal');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.message.error('Đăng xuất thất bại');
      }
    });
  }

  checkPortalLogin(): Observable<boolean> {
    return this.http.get<boolean>('/api/portal/check-login').pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.portalUser.set(null);
          localStorage.removeItem('portalUser');
        }
      })
    );
  }
}
