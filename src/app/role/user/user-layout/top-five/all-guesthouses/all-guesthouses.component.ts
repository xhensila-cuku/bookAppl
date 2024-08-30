import { Component, signal } from '@angular/core';
import { AppComponent } from '../../../../../app.component';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { GuestHouses } from '../../../../../models/guestHouses.model';
import { GuestHousesService } from '../../../../../services/guest-houses.service';

@Component({
  selector: 'app-all-guesthouses',
  standalone: true,
  imports: [AppComponent, MatIconModule, RouterLink, NgStyle, NavBarComponent],
  templateUrl: './all-guesthouses.component.html',
  styleUrl: './all-guesthouses.component.css',
})
export class AllGuesthousesComponent {
  isFetching = signal(false);
  backgroundImages = [
    'url("assets/hotel-1.jpg")',
    'url("assets/hotel-2.jpg")',
    'url("assets/hotel-3.jpg")',
    'url("assets/hotel-4.jpg")',
    'url("assets/hotel-5.jpeg")',
    'url("assets/hotel-6.jpeg")',
    'url("assets/hotel-7.jpeg")',
    'url("assets/hotel-9.jpeg")',
    'url("assets/hotel-10.jpeg")',
    'url("assets/hotel-12.jpeg")',
    'url("assets/hotel-13.jpeg")',
    'url("assets/hotel-14.jpeg")',
  ];

  getBackgroundImage(index: number): string {
    return this.backgroundImages[index % this.backgroundImages.length];
  }
  guestHouseId!: string;
  guestHouses: GuestHouses[] = [];
  constructor(
    private guestHouseService: GuestHousesService,
    private route: Router
  ) {}
  ngOnInit() {
    this.isFetching.set(true);
    this.loadGuesthouses();
  }
  loadGuesthouses() {
    this.guestHouseService.getAllGuestHOuses().subscribe({
      next: (response) => {
        console.log(response), (this.guestHouses = response);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }
}
