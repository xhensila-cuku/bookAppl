import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuesthousesTableComponent } from '../../page/guesthouses-table/guesthouses-table.component'; 
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/side-bar/side-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    GuesthousesTableComponent,
  ],
  template: `
    <div class="contents">
      <div class="first-content">
        <app-header />
      </div>
      <div class="second-content">
        <div class="min-height fit-max-content-width">
          <app-sidebar />
        </div>
        <div class="fit-content-width">
          <router-outlet />
          <!-- <app-guest-houses /> -->
        </div>
      </div>
    </div>
  `,
  styles: `
  .contents {
    display: flex;
    flex-direction: column;
  }
  .first-content {
    /* width: 100vw; */
    background-color: #e5e4e2;
  }
  .second-content {
    display: flex;
  }
  .fit-content-width {
    width: -webkit-fill-available;
  }
  .fit-max-content-width {
    min-width: max-content;
  }
  `,
})
export class AdminLayoutComponent {}
