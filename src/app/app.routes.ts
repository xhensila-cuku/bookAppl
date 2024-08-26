import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './log-in/log-in.component';
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { GuestHousesComponent } from './admin/components/modal/guest-houses/guest-houses.component';
import { RoomComponent } from './admin/components/modal/guest-houses/room/room/room.component';
import { UsersComponent } from './admin/components/users/users.component';
import { AllGuesthousesComponent } from './user/user-layout/top-five/all-guesthouses/all-guesthouses.component';
import { RoomDisplayComponent } from './user/user-layout/room-display/room-display.component';
import { BookRoomComponent } from './user/user-layout/room-display/book-room/book-room.component';
import { UserProfileComponent } from './user/user-layout/user-profile/user-profile.component';
import { PersonalDetailsComponent } from './user/user-layout/user-profile/personal-details/personal-details.component';
import { BookingsComponent } from './user/user-layout/user-profile/bookings/bookings.component';
import { NoTabComponent } from './user/user-layout/user-profile/no-tab/no-tab.component';
import { HomeComponent } from './admin/components/home/home.component';
import { AdminGuard } from './admin/admin.guard';
import { NoAuthGuard } from './services/no-auth.guard';

export const routes: Routes = [
  { path: 'login', canActivate: [NoAuthGuard], component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'guesthouses',
        component: GuestHousesComponent,
      },
      {
        path: 'room/:guesthouseId',
        component: RoomComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
  {
    path: 'page',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'page/all-guesthouses',
    canActivate: [AuthGuard],

    component: AllGuesthousesComponent,
  },
  {
    path: 'page/room-display/:guestHouseId',
    canActivate: [AuthGuard],

    component: RoomDisplayComponent,
  },
  {
    path: 'page/book/:roomId',
    canActivate: [AuthGuard],

    component: BookRoomComponent,
  },
  {
    path: 'page/my-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: NoTabComponent,
      },
      {
        path: 'personal-details',
        component: PersonalDetailsComponent,
      },
      {
        path: 'bookings',
        component: BookingsComponent,
      },
    ],
  },
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    component: RegisterComponent,
  },

  { path: '**', redirectTo: '/login' },
];
