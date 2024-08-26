import { Component } from '@angular/core';
import { NavBarComponent } from './user-layout/nav-bar/nav-bar.component';
import { MainPageComponent } from './user-layout/main-page/main-page.component';
import { GuestHousesService } from '../services/guest-houses.service';
import { GuestHouses } from '../admin/components/modal/guest-houses/guestHouses.modal';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoomDisplayComponent } from './user-layout/room-display/room-display.component';
import { MatIconModule } from '@angular/material/icon';
import { TopFiveComponent } from './user-layout/top-five/top-five.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NavBarComponent,
    MainPageComponent,
    RouterLink,
    RouterOutlet,
    RoomDisplayComponent,
    MatIconModule,
    TopFiveComponent,
    AppComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {}
