import {Component, input} from '@angular/core';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {RouterLink} from '@angular/router';
import {BreadCrumbInterface} from '../../../core/interface/bread-crumb-interface';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    NzBreadCrumbItemComponent,
    NzBreadCrumbComponent,
    RouterLink
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  routes = input<BreadCrumbInterface[]>();


}
