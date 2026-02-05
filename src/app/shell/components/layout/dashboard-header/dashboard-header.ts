import {Component, input, output} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-dashboard-header',
  imports: [
    NzIconDirective,
    NzHeaderComponent
  ],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {
  isCollapsed = input<boolean>(false);

  toggle = output<void>();

  onToggle() {
    this.toggle.emit();
  }

}
