import {Component} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzHeaderComponent,
    NzButtonComponent,
    NzCardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}
