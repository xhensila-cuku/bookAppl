import { Component, signal } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { ModalService } from '../../../../services/modal.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Rooms } from '../../../../models/room.model';

import { MatIconModule } from '@angular/material/icon';
import { Amenities } from '../../../../models/amenity.model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-room-display',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, NavBarComponent, RouterLink],
  templateUrl: './room-display.component.html',
  styleUrl: './room-display.component.css',
})
export class RoomDisplayComponent {
  isFetching = signal(false);
  guestHouseId!: string;
  // errorMessage: string | null = null;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}
  rooms: Rooms[] = [];
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
