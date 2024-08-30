import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/log-in/log-in.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { UserGuard } from './guards/user.guard';
// import { BookingsComponent } from './user/user-layout/user-profile/bookings/bookings.component';
// import { AdminComponent } from './admin/admin.component';
// import { UserComponent } from './user/user.component';
// import { RegisterComponent } from './register/register.component';
// import { GuestHousesComponent } from './admin/components/modal/guest-houses/guest-houses.component';
// import { RoomComponent } from './admin/components/modal/guest-houses/room/room/room.component';
// import { UsersComponent } from './admin/components/users/users.component';
// import { AllGuesthousesComponent } from './user/user-layout/top-five/all-guesthouses/all-guesthouses.component';
// import { RoomDisplayComponent } from './user/user-layout/room-display/room-display.component';
// import { BookRoomComponent } from './user/user-layout/room-display/book-room/book-room.component';
// import { UserProfileComponent } from './user/user-layout/user-profile/user-profile.component';
// import { PersonalDetailsComponent } from './user/user-layout/user-profile/personal-details/personal-details.component';
// import { NoTabComponent } from './user/user-layout/user-profile/no-tab/no-tab.component';

export const routes: Routes = [
  { path: 'login', canActivate: [NoAuthGuard], component: LoginComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./role/admin/admin.component').then((x) => x.AdminComponent),
    canActivate: [AuthGuard, AdminGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: '',
        redirectTo: 'guesthouses',
        pathMatch: 'full',
      },
      {
        path: 'guesthouses',
        loadComponent: () =>
          import('./role/admin/layout/content/guesthouses/guesthouses.component').then(
            (x) => x.GuestHousesComponent
          ),
      },
      {
        path: 'room/:guesthouseId',
        loadComponent: () =>
          import(
            './role/admin/layout/content/guesthouses/room/room.component'
          ).then((x) => x.RoomComponent),
        // component: RoomComponent,
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./role/admin/layout/content/users/users.component').then(
            (x) => x.UsersComponent
          ),
        // component: UsersComponent,
      },
    ],
  },
  {
    path: 'page',
    loadComponent: () =>
      import('./role/user/user.component').then((x) => x.UserComponent),
    // component: UserComponent,
    canActivate: [AuthGuard, UserGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'page/all-guesthouses',
    canActivate: [AuthGuard, UserGuard],
    loadComponent: () =>
      import(
        './role/user/user-layout/top-five/all-guesthouses/all-guesthouses.component'
      ).then((x) => x.AllGuesthousesComponent),
    // component: AllGuesthousesComponent,
  },
  {
    path: 'page/room-display/:guestHouseId',
    canActivate: [AuthGuard, UserGuard],
    loadComponent: () =>
      import(
        './role/user/user-layout/room-display/room-display.component'
      ).then((x) => x.RoomDisplayComponent),
    // component: RoomDisplayComponent,
  },
  {
    path: 'page/book/:roomId',
    canActivate: [AuthGuard, UserGuard],
    loadComponent: () =>
      import(
        './role/user/user-layout/room-display/book-room/book-room.component'
      ).then((x) => x.BookRoomComponent),
    // component: BookRoomComponent,
  },
  {
    path: 'page/my-profile',
    loadComponent: () =>
      import(
        './role/user/user-layout/user-profile/user-profile.component'
      ).then((x) => x.UserProfileComponent),
    // component: UserProfileComponent,
    canActivate: [AuthGuard, UserGuard],

    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './role/user/user-layout/user-profile/no-tab/no-tab.component'
          ).then((x) => x.NoTabComponent),
        // component: NoTabComponent,
      },
      {
        path: 'personal-details',
        loadComponent: () =>
          import(
            './role/user/user-layout/user-profile/personal-details/personal-details.component'
          ).then((x) => x.PersonalDetailsComponent),
        // component: PersonalDetailsComponent,
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import(
            './role/user/user-layout/user-profile/bookings/bookings.component'
          ).then((x) => x.BookingsComponent),
        // component: BookingsComponent,
      },
    ],
  },
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./page/register/register.component').then(
        (x) => x.RegisterComponent
      ),
    // component: RegisterComponent,
  },

  { path: '**', redirectTo: '/login' },
];
