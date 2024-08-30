import { Component } from '@angular/core';
import { Users } from '../../../../core/models/users.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-no-tab',
  standalone: true,
  imports: [],
  templateUrl: './no-tab.component.html',
  styleUrl: './no-tab.component.css',
})
export class NoTabComponent {
  userId: string | null = null;
  isEditing: boolean = false;
  user!: Users;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadUser();
    console.log('User ID:', this.userId);
  }
  loadUser() {
    this.userService.getUserById(this.userId!).subscribe({
      next: (resData) => {
        console.log(resData);
        this.user = resData;
      },
    });
  }
}
