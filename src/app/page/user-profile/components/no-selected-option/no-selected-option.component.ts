import { Component, DestroyRef, OnInit } from '@angular/core';
import { Users } from '../../../../core/models/users.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-no-tab',
  standalone: true,
  imports: [],
  templateUrl: './no-selected-option.component.html',
  styleUrl: './no-selected-option.component.css',
})
export class NoSelectedOptionComponent implements OnInit {
  userId: string | null = null;
  isEditing: boolean = false;
  user!: Users;
  constructor(
    private userService: UserService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadUser();
    console.log('User ID:', this.userId);
  }
  loadUser() {
    const subscription = this.userService.getUserById(this.userId!).subscribe({
      next: (resData) => {
        console.log(resData);
        this.user = resData;
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
