import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Room } from '../../../../../../models/room.model';
import { RoomService } from '../../../../../../services/room.service';
import { DatePipe } from '@angular/common';
import { Book } from '../book-room.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../../../../services/user.service';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css',
  providers: [DatePipe],
})
export class BookModalComponent {
  data!: Room;
  form!: FormGroup;
  today!: string;
  errorMessage!: string;
  errorMessages!: string;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private userService: UserService,
    private datePipe: DatePipe,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      id: [''],
      roomId: [''],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const currentDate = new Date();
    this.today = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
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

    this.userService.getBookedRoomById(this.data.id).subscribe({
      next: (bookings: Book[]) => {
        const isDateTheSame = bookings.some((booking) => {
          const existingCheckIn = this.datePipe.transform(
            booking.bookFrom,
            'MM/dd/yy'
          );
          const existingCheckOut = this.datePipe.transform(
            booking.bookTo,
            'MM/dd/yy'
          );

          return (
            (formattedCheckIn! >= existingCheckIn! &&
              formattedCheckIn! < existingCheckOut!) ||
            (formattedCheckOut! > existingCheckIn! &&
              formattedCheckOut! <= existingCheckOut!)
          );
        });

        if (isDateTheSame) {
          this.errorMessages =
            'The room is already booked for the selected dates.';
          console.log(this.errorMessages);
        } else {
          const newBook: Book = {
            ...this.form.value,
            bookFrom: formattedCheckIn || '',
            bookTo: formattedCheckOut || '',
            roomId: this.data.id,
            room: {
              id: this.data.id,
              name: this.data!.name,
              description: this.data!.description,
              image: this.data!.image,
              price: this.data!.price,
              numberOfBeds: this.data!.numberOfBeds,
              guestHouseId: this.data!.guestHouseId,
              amenities: this.data!.amenities,
            },
          };

          this.roomService.bookRoom(this.data.id, newBook).subscribe({
            next: (resData) => {
              console.log('Book added successfully:', resData);
              this.activeModal.close(resData);
            },
            error: (error) => {
              console.error('Error:', error);
              this.errorMessage = 'Adding new Book failed. Please try again.';
            },
            complete: () => console.log('Adding new Book completed'),
          });
        }
      },
      error: (error) => {
        console.error('Error fetching existing bookings:', error);
        this.errorMessage =
          'Failed to check existing bookings. Please try again.';
      },
    });

    this.form.reset();
  }

  close() {
    this.activeModal.dismiss();
  }
}
