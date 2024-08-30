import { Component, signal } from '@angular/core';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { GuestHouses } from '../../../../core/models/guestHouses.model';
import { GuestHousesService } from '../../../../core/services/guest-houses.service';

@Component({
  selector: 'app-top-five',
  standalone: true,
  imports: [RouterLink, MatIconModule, RouterOutlet, NgStyle],
  templateUrl: './top-five.component.html',
  styleUrl: './top-five.component.css',
})
export class TopFiveComponent {
  guestHouseId!: string;
  guestHouses: GuestHouses[] = [];
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
  constructor(
    private guestHouseService: GuestHousesService,
    private route: Router
  ) {}
  ngOnInit() {
    this.isFetching.set(true);
    this.loadGuesthouses();
  }
  loadGuesthouses() {
    this.guestHouseService.getTopFiveGuestHouses().subscribe({
      next: (response) => {
        console.log(response), (this.guestHouses = response);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }
  goToRooms(data: string) {
    this.guestHouseId = data;
    this.route.navigate(['page/room-details', this.guestHouseId]);
  }
  goToAllGuesthouses() {
    this.route.navigate(['page/all-guesthouses']);
  }
}
