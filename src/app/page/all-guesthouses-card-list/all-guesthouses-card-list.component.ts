import { NgStyle } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { GuestHouses } from '../../core/models/guestHouses.model';
import { GuestHousesService } from '../../core/services/guest-houses.service';

@Component({
  selector: 'app-all-guesthouses-card-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, NgStyle],
  templateUrl: './all-guesthouses-card-list.component.html',
  styleUrl: './all-guesthouses-card-list.component.css',
})
export class AllGuesthousesCardListComponent implements OnInit {
  isFetching = signal(false);
  errorMessage: string | null=null;
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
        console.log(response); 
        this.guestHouses = response;
      }, 
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Fetching all guesthouses failed';
      },
      complete: () => {
        this.isFetching.set(false);
        console.log('Fetched all guesthouses successfully')
      },
    });
  }
  getBackgroundImage(index: number): string {
    return this.backgroundImages[index % this.backgroundImages.length];
  }
}
