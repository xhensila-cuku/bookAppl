import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/pagelayout/header/header.component';
import { SidebarComponent } from './admin/pagelayout/header/sidebar/sidebar.component';
import { GuestHousesComponent } from './admin/components/modal/guest-houses/guest-houses.component';

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
