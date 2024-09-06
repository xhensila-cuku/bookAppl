import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Rooms } from '../../core/models/room.model';
import { RoomService } from '../../core/services/room.service';

import { MatIconModule } from '@angular/material/icon';
import { Amenities } from '../../core/models/amenity.model';
import { NavBarComponent } from '../../layouts/user-layout/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, NavBarComponent, RouterLink],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent implements OnInit {
  isFetching = signal(false);
  guestHouseId!: string;
  // errorMessage: string | null = null;
  rooms: Rooms[] = [];
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isFetching.set(true);
    this.guestHouseId = this.route.snapshot.paramMap.get('guestHouseId')!;
    this.loadRooms();
    console.log('GuestHouse ID:', this.guestHouseId);
  }

  loadRooms() {
    this.roomService.getRoomByGuesthouseId(this.guestHouseId).subscribe({
      next: (response) => {
        console.log(response);
        this.rooms = response;
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }

  getAmenityName(amenityNumber: any): string {
    return Amenities[amenityNumber];
  }
}
