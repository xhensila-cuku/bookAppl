import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
  template: `
    <app-nav-bar />

    <!-- <div>
            <app-main-page></app-main-page>
          </div>
          <div>
            <app-top-five></app-top-five>
          </div> -->
    <main>
      <router-outlet />
    </main>
  `,
  styles: ``,
})
export class UserLayoutComponent {}
