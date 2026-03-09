import {Component, computed, effect, inject, signal} from '@angular/core';
// import {Header} from '../../shell/components/header/header';
import {RouterOutlet} from '@angular/router';
import {Header} from '../../../shell/components/generic/header/header';
import {AuthService} from '../../../core/service/auth-service';

@Component({
  selector: 'app-public-layout',
  imports: [
    // Header,
    RouterOutlet,
    Header
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {
  private authService = inject(AuthService);
  private currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.authService.currentUser);

  logout() {
    this.authService.logout();
  }
}
