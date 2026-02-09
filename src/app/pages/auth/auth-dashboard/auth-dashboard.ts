import {Component} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-auth-dashboard',
  imports: [
    RouterModule,
    NzCardComponent
  ],
  templateUrl: './auth-dashboard.html',
  styleUrl: './auth-dashboard.css',
})
export class AuthDashboard {

}
