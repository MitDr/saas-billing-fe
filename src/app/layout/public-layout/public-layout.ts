import { Component } from '@angular/core';
// import {Header} from '../../shell/components/header/header';
import {RouterOutlet} from '@angular/router';
import {Header} from '../../shell/components/generic/header/header';

@Component({
  selector: 'app-public-layout',
  imports: [
    // Header,
    RouterOutlet,
    Header
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {

}
