import { Component, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GuestHouses } from '../../../../../models/guestHouses.model';

import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { GuestHousesService } from '../../../../../services/guest-houses.service';
import { ModalService } from '../../../../../services/modal.service';
import { ModalComponent } from './guesthouse-modal/guesthouse-modal.component'; 
import { Router, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { DeleteModal } from './delete-modal/delete-modal.component';
@Component({
  selector: 'app-guest-houses',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    RouterLink,
    NgbPaginationModule,
    SlicePipe,
  ],
  templateUrl: './guesthouses.component.html',
  styleUrl: './guesthouses.component.css',
})
export class GuestHousesComponent {
  guestHouseId: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private guestHouseService: GuestHousesService,
    private modalService: NgbModal,
    private modalServices: ModalService,
    private route: Router
  ) {}
  GuestHouses: any;
  guestHouses: GuestHouses[] = [];
  page = 1;
  pageSize = 6;

  ngOnInit() {
    this.loadGuesthouses();
  }
  loadGuesthouses() {
    this.guestHouseService.getAllGuestHOuses().subscribe({
      next: (response) => {
        console.log(response);
        this.guestHouses = response;
      },
    });
  }
  onNewGuestHouse() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.result
      .then((result: GuestHouses) => {
        if (result) {
          this.guestHouses.push(result);
        }
      })
      .catch((error) => {
        console.log('Modal dismissed:', error);
      });
  }

  onEdit(data: GuestHouses) {
    const originalData = { ...data };
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = { ...data };

    modalRef.result
      .then((updatedData) => {
        if (updatedData) {
          const dataHasChanged =
            JSON.stringify(originalData) !== JSON.stringify(updatedData);
          if (dataHasChanged) {
            const guesthouseIndex = this.guestHouses.findIndex(
              (gh) => gh.id === updatedData.id
            );
            if (guesthouseIndex !== -1) {
              this.guestHouses[guesthouseIndex] = updatedData;
              this.errorMessage = null;
              console.log('Guesthouse Updated:', updatedData);
            }
          } else {
            this.showErrorMessage(
              'No changes detected. Guesthouse data remains unchanged.'
            );
          }
        }
      })
      .catch((error) => {
        this.errorMessage = 'Failed to edit guest house.';
        console.log('Modal dismissed:', error);
      });

    console.log('Edit data', data);
  }
  onDelete(guesthouseId: any) {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.result
      .then((result) => {
        if (result === 'confirm') {
          this.modalServices.deleteGuesthouse(guesthouseId).subscribe({
            next: (resData) => console.log(resData),
            error: (error) => {
              console.error('Error:', error);
            },
            complete: () => {
              console.log('Deletion completed');
              this.guestHouses = this.guestHouses.filter(
                (guesthouse) => guesthouse.id !== guesthouseId
              );
            },
          });
        }
      })
      .catch((error) => {
        console.log('Modal dismissed:', error);
      });
  }

  goToRooms(data: string) {
    const guestHousesId = data;
    this.route.navigate(['/admin/room', guestHousesId]);
    console.log(this.guestHouseId);
  }
  get collectionSize(): number {
    return this.guestHouses.length;
  }
  showErrorMessage(message: string) {
    this.errorMessage = message;

    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }
}
