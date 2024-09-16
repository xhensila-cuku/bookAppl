import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../core/models/users.model';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css',
})
export class PersonalDetailsComponent implements OnInit {
  userId: string | null = null;
  isEditing: boolean = false;
  user!: Users;
  errorMessage: string| null=null;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadUser();
    console.log('User ID:', this.userId);
  }
  onLogOut() {
    this.authService.logout();
    console.log('Logged out successfully');
  }
  
  loadUser() {
    this.userService.getUserById(this.userId!).subscribe({
      next: (resData) => {
        console.log(resData);
        this.user = resData;
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Fetching available guesthouses failed';
      },
      complete(){
        console.log('User fetched successfully');
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.userService.updateUserWithId(this.user.id, this.user).subscribe({
      next: (response) => {
        this.isEditing = false;
        this.user = response;
        console.log('User updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
      complete() {
        console.log('User updated');
      },
    });
  }
}
