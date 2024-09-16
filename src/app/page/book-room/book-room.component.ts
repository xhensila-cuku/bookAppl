import { Component, OnInit, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Amenities } from '../../core/models/amenity.model';
import { NavBarComponent } from '../../layouts/user-layout/components/nav-bar/nav-bar.component';

import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from '../../core/models/room.model';
import { RoomService } from '../../core/services/room.service';
import { BookModalComponent } from './components/book-modal/book-modal.component';
import { Book } from './models/book-room.model';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [MatIconModule, RouterLink, NavBarComponent, ReactiveFormsModule],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css',
  providers: [DatePipe],
})
export class BookRoomComponent implements OnInit {
  isFetching = signal(false);
  bookings!: Book[];
  message: string | null = null;
  roomId!: string;
  errorMessage: string | null = null;
  room?: Room;
  today?: string;
  constructor(
    private modalService: NgbModal,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.isFetching.set(true);
    this.roomId = this.route.snapshot.paramMap.get('roomId')!;
    this.loadRooms();
    console.log('Room ID:', this.roomId);
    const currentDate = new Date();
    this.today = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
  }

  loadRooms() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (response) => {
        console.log(response);
        this.room = response;
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Fetching available guesthouses failed';
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }
  onBook(data: Room | undefined) {
    const modalRef = this.modalService.open(BookModalComponent);
    modalRef.componentInstance.data = { ...data };
    modalRef.result
      .then((result) => {
        if (result) {
          this.showMessage('Room added successfully');
        }
      })
      .catch((error) => {
        console.log('Modal dismissed:', error);
      });
  }

  getAmenityName(amenityNumber: any): string {
    return Amenities[amenityNumber];
  }
  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }
}
