import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../../../../../services/room.service';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../../../../services/modal.service';
import { Rooms } from '../../../../../../models/room.model';
import { tap } from 'rxjs';
import { RoomModalComponent } from './room-modal/room-modal.component';
import { ActivatedRoute } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { Amenities } from '../../../../../../models/amenity.model';
import { DeleteModal } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MatIconModule, NgbPaginationModule, SlicePipe],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  guestHouseId!: string;
  errorMessage: string | null = null;

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal,
    private modalServices: ModalService,
    private route: ActivatedRoute
  ) {}
  Rooms: any;
  rooms: Rooms[] = [];
  page = 1;
  pageSize = 6;
  ngOnInit(): void {
    this.guestHouseId = this.route.snapshot.paramMap.get('guesthouseId')!;
    this.loadRooms();
    console.log('GuestHouse ID:', this.guestHouseId);
  }

  loadRooms() {
    const id: string = this.guestHouseId;
    this.roomService.getRoomByGuesthouseId(id).subscribe({
      next: (response) => {
        console.log(response);
        this.rooms = response;
      },
    });
  }
  get collectionSize(): number {
    return this.rooms.length;
  }
  onNewRoom() {
    const modalRef = this.modalService.open(RoomModalComponent);
    modalRef.componentInstance.guestHouseId = this.guestHouseId;
    modalRef.result
      .then((result) => {
        if (result) {
          this.rooms.push(result);
        }
      })
      .catch((error) => {
        console.log('Modal dismissed:', error);
      });
  }
  onEdit(data: any) {
    const originalData = { ...data };
    const modalRef = this.modalService.open(RoomModalComponent);
    modalRef.componentInstance.data = { ...data };

    modalRef.result
      .then((updatedData) => {
        if (updatedData) {
          console.log('Updated Data:', updatedData);
          if (!updatedData.id) {
            this.errorMessage =
              'Room ID is missing. Cannot update room without an ID.';
            return;
          }
          const dataHasChanged =
            JSON.stringify(originalData) !== JSON.stringify(updatedData);
          if (dataHasChanged) {
            const roomIndex = this.rooms.findIndex(
              (room) => room.id === updatedData.id
            );
            if (roomIndex !== -1) {
              this.rooms[roomIndex] = updatedData;
              this.errorMessage = null;
              console.log('Room Updated:', updatedData);
            }
          } else {
            this.showErrorMessage(
              'No changes detected. Room data remains unchanged.'
            );
          }
        }
      })
      .catch((error) => {
        this.showErrorMessage('The editing was canceled');
        console.log('Modal dismissed:', error);
      });

    console.log('Edit data', data);
  }
  onDelete(roomId: any) {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.modalServices.deleteRoom(roomId).subscribe({
          next: (resData) => console.log(resData),
          error: (error) => {
            console.error('Error:', error);
          },
          complete: () => {
            console.log('Deletion completed');
            this.rooms = this.rooms.filter((room) => room.id !== roomId);
          },
        });
      }
    });
  }
  getAmenityName(amenityNumber: any): string {
    return Amenities[amenityNumber];
  }
  showErrorMessage(message: string) {
    this.errorMessage = message;

    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }
}
