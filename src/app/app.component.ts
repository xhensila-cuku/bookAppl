import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './page/log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { HeaderComponent } from './role/admin/layout/header/header.component';
import { SidebarComponent } from './role/admin/layout/side-bar/side-bar.component';
import { GuestHousesComponent } from './role/admin/layout/content/guesthouses/guesthouses.component';
import { AdminComponent } from './role/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    MatIconModule,
    GuestHousesComponent,
    AdminComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Guesthouse';
}
