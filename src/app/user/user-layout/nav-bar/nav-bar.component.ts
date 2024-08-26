import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, NgbDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}
  onLogOut() {
    this.authService.logout();
    console.log('Logged out successfully');
  }
}
