import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { SidebarComponent } from './layout/side-bar/side-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { GuestHousesComponent } from './layout/content/guesthouses/guesthouses.component';


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
