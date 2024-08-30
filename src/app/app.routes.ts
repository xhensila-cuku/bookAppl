import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { UserGuard } from './core/guards/user.guard';


export const routes: Routes = [
  { path: 'login', canActivate: [NoAuthGuard], 
    loadComponent: () =>
      import('./page/log-in/log-in.component').then(
        (x) => x.LoginComponent
      ), },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then(
        (x) => x.AdminLayoutComponent
      ),
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
          import('./page/guesthouses-table/guesthouses-table.component').then(
            (x) => x.GuesthousesTableComponent
          ),
      },
      {
        path: 'room/:guesthouseId',
        loadComponent: () =>
          import('./page/rooms-table/rooms-table.component').then(
            (x) => x.RoomsTableComponent
          ),
        // component: RoomComponent,
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./page/users-table/users-table.component').then(
            (x) => x.UsersTableComponent
          ),
        // component: UsersComponent,
      },
    ],
  },
  {
    path: 'page',
    loadComponent: () =>
      import('./layouts/user-layout/user-layout.component').then(
        (x) => x.UserLayoutComponent
      ),
    // component: UserComponent,
    canActivate: [AuthGuard, UserGuard],
    data: { roles: ['User'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./page/home/home.component').then((x) => x.HomeComponent),
      },
      {
        path: 'all-guesthouses',
        loadComponent: () =>
          import(
            './page/all-guesthouses-card-list/all-guesthouses-card-list.component'
          ).then((x) => x.AllGuesthousesCardListComponent),
        // component: AllGuesthousesComponent,
      },
      {
        path: 'room-details/:guestHouseId',
        loadComponent: () =>
          import('./page/room-details/room-details.component').then(
            (x) => x.RoomDetailsComponent
          ),
        // component: RoomDisplayComponent,
      },
      {
        path: 'book/:roomId',
        loadComponent: () =>
          import('./page/book-room/book-room.component').then(
            (x) => x.BookRoomComponent
          ),
        // component: BookRoomComponent,
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./page/user-profile/user-profile.component').then(
            (x) => x.UserProfileComponent
          ),
        // component: UserProfileComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './page/user-profile/components/no-tab/no-tab.component'
              ).then((x) => x.NoTabComponent),
            // component: NoTabComponent,
          },
          {
            path: 'personal-details',
            loadComponent: () =>
              import(
                './page/user-profile/components/personal-details/personal-details.component'
              ).then((x) => x.PersonalDetailsComponent),
            // component: PersonalDetailsComponent,
          },
          {
            path: 'bookings',
            loadComponent: () =>
              import(
                './page/user-profile/components/bookings/bookings.component'
              ).then((x) => x.BookingsComponent),
            // component: BookingsComponent,
          },
        ],
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
