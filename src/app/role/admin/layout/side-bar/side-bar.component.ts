import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SidebarComponent {
  detailsVisible = signal(true);
  onToggleDetails() {
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }
  constructor(private authService: AuthService) {}


  logOut() {
    this.authService.logout();
    console.log('Logged out successfully');
 
  }
}
