import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GuestHouses } from '../../core/models/guestHouses.model';
import { GuestHousesService } from '../../core/services/guest-houses.service';
import { ModalService } from '../../core/services/modal.service';
import { DeleteModal } from './components/delete-modal/delete-modal.component'; 
import { ModalComponent } from './components/guesthouse-modal/guesthouse-modal.component'; 
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-guesthouses-table',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    RouterLink,
    NgbPaginationModule,
    SlicePipe,
  ],
  templateUrl: './guesthouses-table.component.html',
  styleUrl: './guesthouses-table.component.css',
})
export class GuesthousesTableComponent {
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
