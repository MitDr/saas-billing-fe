import {Component, inject} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {environment} from '../../../../env/enviroment';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-document',
  imports: [
    NzCardComponent,
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './document.html',
  styleUrl: './document.css',
})
export class Document {
  router = inject(Router);

  goToSwagger() {
    window.location.href = environment.apiUrl + "/swagger-ui/index.html";
  }

  goToChatBot() {
    this.router.navigate(['/app/ai-chat'])
  }
}
