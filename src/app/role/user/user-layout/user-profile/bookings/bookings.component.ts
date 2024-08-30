import { Component, signal } from '@angular/core';
import { Book } from '../../room-display/book-room/book-room.model';

import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
  // providers:[DatePipe],
})
export class BookingsComponent {
  userId!: string;
  isFetching = signal(false);
  bookings: Book[] = [];
  filteredBookings: any[] = [];
  pastBookings: any[] = [];
  todayBookings: any[] = [];
  upcomingBookings: any[] = [];
  selectedFilter: string = 'today';
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.isFetching.set(true);
    this.userId = localStorage.getItem('userId')!;
    this.loadBooking();
    console.log('User ID:', this.userId);
  }

  loadBooking() {
    this.userService.getUsersBookings(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.bookings = response;
        this.displayingBookingsByDate();
        this.applyFilter(this.selectedFilter);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }
  displayingBookingsByDate() {
    const today = new Date();
    this.pastBookings = this.bookings.filter(bookings => new Date(bookings.bookTo) < today);
    this.todayBookings = this.bookings.filter(bookings => 
      new Date(bookings.bookFrom) <= today && new Date(bookings.bookTo) >= today
    );
    this.upcomingBookings = this.bookings.filter(bookings => new Date(bookings.bookFrom) > today);
  }

  applyFilter(filter: string) {
    this.selectedFilter = filter;

    if (filter === 'past') {
      this.filteredBookings = this.pastBookings;
    } else if (filter === 'today') {
      this.filteredBookings = this.todayBookings;
    } else if (filter === 'upcoming') {
      this.filteredBookings = this.upcomingBookings;
    }
  }
}
