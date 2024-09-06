import { Component, OnInit, signal } from '@angular/core';

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
export class TopFiveComponent implements OnInit{
  guestHouseId!: string;
  guestHouses: GuestHouses[] = [];
  isFetching = signal(false);

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
        console.log(response); 
        this.guestHouses = response;
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
