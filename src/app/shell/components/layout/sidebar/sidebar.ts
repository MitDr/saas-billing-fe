import {Component, input} from '@angular/core';
import {NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {RouterLink} from '@angular/router';
import {MenuItem} from '../../../../core/interface/MenuItem';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropdownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-sidebar',
  imports: [
    NzSiderComponent,
    NzMenuDirective,
    NzSubMenuComponent,
    NzMenuItemComponent,
    RouterLink,
    NzIconDirective,
    NzIconModule,
    NzDropdownDirective,
    NzDropdownMenuComponent
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = input<boolean>(false);
  menu=input.required<MenuItem[]>();
}
