import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Users } from '../../core/models/users.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatIconModule, NgbPaginationModule, SlicePipe],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  users: Users[] = [];
  page = 1;
  pageSize = 6;
  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        console.log(response), (this.users = response);
      },
    });
  }
  get collectionSize(): number {
    return this.users.length;
  }
}
