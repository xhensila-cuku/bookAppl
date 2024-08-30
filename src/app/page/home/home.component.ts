import { DatePipe } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GuestHouses } from '../../core/models/guestHouses.model';
import { GuestHousesService } from '../../core/services/guest-houses.service';
import { TopFiveComponent } from "./components/top-five/top-five.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIconModule, TopFiveComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]
})
export class HomeComponent {
  form!: FormGroup;
  userId!: string;
  today!: string;
  errorMessage?: string;
  isFetching = signal(false);
  @ViewChild('guesthouses') guesthousesSection!: ElementRef;

  bookings: GuestHouses[] = [];
  constructor(
    private fb: FormBuilder,
    private guesthousesService: GuestHousesService,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      // id: [''],
      // roomId: [''],
      destination: [''],
      bookTo: ['', [Validators.required]],
      bookFrom: ['', [Validators.required]],
      numberOfBeds: [0],
    });
  }
  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;
    const currentDate = new Date();
    this.today = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isFetching.set(true);

    const formattedCheckIn = this.datePipe.transform(
      this.form.value.bookTo,
      'MM/dd/yy'
    )!;
    const formattedCheckOut = this.datePipe.transform(
      this.form.value.bookFrom,
      'MM/dd/yy'
    )!;
    const formData = this.form.value;
    const newBook = {
      ...formData,
      bookFrom: formattedCheckIn || '',
      bookTo: formattedCheckOut || '',
    };
    this.guesthousesService
      .getAllGuestHousesByDate(
        newBook.bookFrom,
        newBook.bookTo,
        newBook.numberOfBeds
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.bookings = response;
          this.scrollToGuesthouses();
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Fetching available guesthouses failed';
        },
        complete: () =>
          console.log('Fetching all available guesthouses completed'),
      });
  }
  scrollToGuesthouses() {
    this.guesthousesSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
