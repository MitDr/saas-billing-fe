import {Component} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-page-successful',
  imports: [
    NzIconDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './page-successful.html',
  styleUrl: './page-successful.css',
})
export class PageSuccessful {

}
