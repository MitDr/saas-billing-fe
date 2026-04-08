import {Component} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-page-failed',
  imports: [
    NzIconDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './page-failed.html',
  styleUrl: './page-failed.css',
})
export class PageFailed {

}
