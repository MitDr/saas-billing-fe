import {Routes} from '@angular/router';
import {Welcome} from '../welcome/welcome';
import {Component} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-home',
  imports: [
    NzHeaderComponent,
    NzButtonComponent,
    NzIconDirective,
    NzCardMetaComponent,
    NzCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  currentYear = new Date().getFullYear();
}
