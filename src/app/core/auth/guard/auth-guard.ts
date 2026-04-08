import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../service/auth-service';
import {map, take} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user?.role === 'USER') return true;
      router.navigate(['/auth/login']);
      return false;
    })
  );
};

export const authRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        if (user.role === 'ADMIN') {
          return router.createUrlTree(['/admin/dashboard']);
        } else if (user.role === 'USER') {
          return router.createUrlTree(['/app/dashboard']);   // hoặc '/dashboard' tùy bạn
        }
      }
      return true;
    })
  );
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user?.role === 'ADMIN') return true;
      router.navigate(['/auth/login']);
      return false;
    })
  );
};
