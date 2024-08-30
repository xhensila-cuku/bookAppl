import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { Users } from '../../../../../models/users.model';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatIconModule, NgbPaginationModule, SlicePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
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
