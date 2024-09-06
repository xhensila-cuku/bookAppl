import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './page/log-in/log-in.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component'; 
import { GuesthousesTableComponent } from './page/guesthouses-table/guesthouses-table.component';
import { HeaderComponent } from './layouts/admin-layout/components/header/header.component';
import { SidebarComponent } from './layouts/admin-layout/components/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    MatIconModule,
    GuesthousesTableComponent,
    AdminLayoutComponent,
  ],
  template: ` <router-outlet />`,
})
export class AppComponent {
 
}
