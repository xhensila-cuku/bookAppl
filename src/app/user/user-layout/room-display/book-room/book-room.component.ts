import { Component, OnInit, signal } from '@angular/core';
import { Room } from '../../../../admin/components/modal/guest-houses/room/room/room.model';
import { RoomService } from '../../../../services/room.service';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { Amenities } from '../../../../shared/utils/amenity.model';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from './book-room.model';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomModalComponent } from '../../../../admin/components/modal/guest-houses/room/room/room-modal/room-modal.component';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [MatIconModule, RouterLink, NavBarComponent, ReactiveFormsModule],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css',
  providers: [DatePipe],
})
export class BookRoomComponent implements OnInit {
  isFetching= signal(false);
  form: FormGroup;
  roomId!: string;
  errorMessage: string | null = null;
  room?: Room;
  today!: string;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      id: [''],
      roomId: [''],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.isFetching.set(true);
    this.roomId = this.route.snapshot.paramMap.get('roomId')!;
    this.loadRooms();
    console.log('GuestHouse ID:', this.roomId);
    const currentDate = new Date();
    this.today = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
  }

  loadRooms() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (response) => {
        console.log(response);
        this.room = response;
      },
      complete:()=>{
        this.isFetching.set(false);
      }
    });
  }
  onBook(data: Room| undefined){
    const modalRef = this.modalService.open(BookModalComponent);
    modalRef.componentInstance.data = { ...data };

  }

  getAmenityName(amenityNumber: any): string {
    return Amenities[amenityNumber];
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formattedCheckIn = this.datePipe.transform(
      this.form.value.checkIn,
      'MM/dd/yy'
    );
    const formattedCheckOut = this.datePipe.transform(
      this.form.value.checkOut,
      'MM/dd/yy'
    );
    const formData = this.form.value;

    const newBook: Book = {
      ...formData,
      bookFrom: formattedCheckIn || '',
      bookTo: formattedCheckOut || '',
      roomId: this.roomId,
      room: {
        id: this.roomId,
        name: this.room!.name,
        description: this.room!.description,
        image: this.room!.image,
        price: this.room!.price,
        numberOfBeds: this.room!.numberOfBeds,
        guestHouseId: this.room!.guestHouseId,
        amenities: this.room!.amenities,
      },
    };
    console.log('Room Data:', newBook);
    this.roomService.bookRoom(this.roomId, newBook).subscribe({
      next: (resData) => {
        console.log('Book added successfully:', resData);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Adding new Book failed. Please try again.';
      },
      complete: () => console.log('Adding new Book completed'),
    });
    this.form.reset();
  }
}


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
// import { BookingService } from './booking.service';

// @Component({
//   selector: 'app-booking-form',
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css'],
//   providers: [DatePipe]
// })
// export class BookingFormComponent implements OnInit {
//   bookingForm: FormGroup;
//   today: string;
//   unavailableDates: Set<string> = new Set();

//   constructor(private fb: FormBuilder, private bookingService: BookingService, private datePipe: DatePipe) {
//     this.bookingForm = this.fb.group({
//       checkInDate: ['', Validators.required],
//       checkOutDate: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const currentDate = new Date();
//     this.today = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;

//     // Fetch existing bookings for a specific room
//     this.bookingService.getBookingsForRoom(1).subscribe(bookings => {
//       bookings.forEach(booking => {
//         let date = new Date(booking.checkIn);
//         const endDate = new Date(booking.checkOut);

//         // Add each date in the range to the unavailable dates set
//         while (date <= endDate) {
//           const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd')!;
//           this.unavailableDates.add(formattedDate);
//           date.setDate(date.getDate() + 1);
//         }
//       });
//     });
//   }

//   isDateUnavailable(date: string): boolean {
//     return this.unavailableDates.has(date);
//   }
// }