import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pagelayout/header/header.component';
import { GuestHousesComponent } from './components/modal/guest-houses/guest-houses.component';
import { SidebarComponent } from './pagelayout/header/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    GuestHousesComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
