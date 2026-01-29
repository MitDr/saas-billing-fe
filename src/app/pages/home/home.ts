import {Routes} from '@angular/router';
import {Welcome} from '../welcome/welcome';
import {Component} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home',
  imports: [
    NzHeaderComponent,
    NzButtonComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
