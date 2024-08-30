import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../../../../../services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { Rooms } from '../../../../../../../models/room.model';
import { fileToBase64Fn } from '../../../../../../../shared/utils/filteToBase64Fn';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    SelectDropDownModule,
  ],
  templateUrl: './room-modal.component.html',
  styleUrl: './room-modal.component.css',
})
export class RoomModalComponent {
  selectionChanged($event: Event) {
    throw new Error('Method not implemented.');
  }
  @Input({ required: true }) guestHouseId!: string;

  data!: Rooms;
  form: FormGroup;
  errorMessage: string | null = null;
  // selectedAmenities: string[] = [];
  types: string[] = [
    'Parking',
    'FreeWifi',
    'Pool',
    'Fitness',
    'Security',
    'Elevators',
    'Terrace',
  ];
  config = {
    displayKey: "description",
    search: true, 
    height: 'auto',
    placeholder: 'Select Amenities',
    limitTo: 0, 
    moreText: 'more', 
    noResultsFound: 'No results found!', 
    searchPlaceholder: 'Search',
    searchOnKey: 'name' 
  };
  
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [null, [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      numberOfBeds: [1, [Validators.required]],
      guestHouseId: [''],
      amenities: [[]],
    });
  }

  ngOnInit() {
    console.log('on Edit', this.guestHouseId);
    // console.log('Initial Form Values:', this.form.value);
    this.form.patchValue({
      guestHouseId: this.guestHouseId,
    });
    // console.log('After guestHouseId patch:', this.form.value);
    if (this.data != null) {
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
        image: this.data.image,
        numberOfBeds: this.data.numberOfBeds,
        price: this.data.price,
        amenities: this.data.amenities,
        guestHouseId: this.data.guestHouseId,
      });
    }
  }
  onSubmit() {
    console.log('Form Validity:', this.form.valid);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.form.value;
    if (this.data) {
      this.modalService.updateRoom(this.data.id, formData).subscribe({
        next: (resData) => {
          console.log(resData), this.activeModal.close(resData);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Updating Room failed. Please try again.';
        },
        complete: () => console.log('Updating Room completed'),
      });
    } else {
      const price = parseFloat(formData.price.toFixed(2));

      const newRoom: Rooms = {
        ...formData,
        price: price,
        guestHouseId: this.guestHouseId,
      };

      console.log('Room Data:', newRoom);

      this.modalService.addRoom(this.guestHouseId, newRoom).subscribe({
        next: (resData) => {
          console.log('Room added successfully:', resData);
          this.activeModal.close(resData);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Adding new Room failed. Please try again.';
        },
        complete: () => console.log('Adding new Room completed'),
      });
    }

    this.form.reset();
  }

  close() {
    this.activeModal.dismiss();
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const base64String = await fileToBase64Fn(file);
      const base64StringWithoutBase64Prefix = base64String.substring(
        base64String.indexOf(',') + 1
      );

      this.form.patchValue({
        image: base64StringWithoutBase64Prefix,
      });
    }
  }
  onSelectChange(event: any) {
    console.log('Selected:', event);
  }
  // config = {
  //   search: true,
  //   height: 'auto',
  //   placeholder: 'Select Amenities',
  //   multiple: true,
  //   selectAll: true
  // };
}
