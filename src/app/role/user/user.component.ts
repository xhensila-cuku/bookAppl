import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TopFiveComponent } from './user-layout/top-five/top-five.component';
import { AppComponent } from '../../app.component';
import { NavBarComponent } from './user-layout/nav-bar/nav-bar.component';
import { MainPageComponent } from './user-layout/main-page/main-page.component';
import { RoomDisplayComponent } from './user-layout/room-display/room-display.component';

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
