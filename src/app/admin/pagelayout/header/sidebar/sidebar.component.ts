import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
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
