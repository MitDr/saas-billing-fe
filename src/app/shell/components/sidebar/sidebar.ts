import {Component, input} from '@angular/core';
import {NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    NzLayoutComponent,
    NzSiderComponent,
    NzMenuDirective,
    NzSubMenuComponent,
    NzMenuItemComponent,
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = input<boolean>(false);

}
