import {Component} from '@angular/core';
import {NzResultComponent} from 'ng-zorro-antd/result';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-page-not-found',
  imports: [
    NzResultComponent,
    NzButtonComponent,
    RouterLink,
    NzIconDirective
  ],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
}
