import {Component, input, output} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzDropdownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzMenuDirective, NzMenuDividerDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzSegmentedComponent, NzSegmentedItemComponent} from 'ng-zorro-antd/segmented';

@Component({
  selector: 'app-dashboard-header',
  imports: [
    NzIconDirective,
    NzHeaderComponent,
    NzDropdownDirective,
    NzAvatarComponent,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzMenuDividerDirective,
    RouterLink,
    NzButtonComponent,
    NzTagComponent,
    NzSegmentedComponent,
    NzSegmentedItemComponent
  ],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {

  isCollapsed = input<boolean>(false);

  toggle = output<void>();
  logout = output<void>();

  onToggle() {
    this.toggle.emit();
  }
}
