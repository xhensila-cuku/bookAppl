import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Amenities } from '../../core/models/amenity.model';
import { Rooms } from '../../core/models/room.model';
import { ModalService } from '../../core/services/modal.service';
import { RoomService } from '../../core/services/room.service';
import { DeleteModal } from '../guesthouses-table/components/delete-modal/delete-modal.component';
import { RoomModalComponent } from './components/room-modal/room-modal.component';

@Component({
  selector: 'app-rooms-table',
  standalone: true,
  imports: [MatIconModule, NgbPaginationModule, SlicePipe],
  templateUrl: './rooms-table.component.html',
  styleUrl: './rooms-table.component.css',
})
export class RoomsTableComponent implements OnInit{
  guestHouseId!: string;
  errorMessage: string | null = null;
  message?: string | null;

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
          this.showMessage('Room added successfully')
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
              this.showMessage('Room updated successfully')
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
            this.showMessage('Room deleted successfully')
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
  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }
}
