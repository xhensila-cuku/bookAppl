import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../../core/services/modal.service';  
import { MatIconModule } from '@angular/material/icon';
import { GuestHouses } from '../../../../core/models/guestHouses.model'; 

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './guesthouse-modal.component.html',
  styleUrl: './guesthouse-modal.component.css',
})
export class ModalComponent implements OnInit {
  data!: GuestHouses;
  form: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      // id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log('on Edit', this.data);
    if (this.data != null) {
      this.form.patchValue({
        name: this.data.name,
        description: this.data.description,
      });
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const loginData = this.form.value;

    if (this.data) {
      this.modalService.updateGuesthouse(this.data.id, loginData).subscribe({
        next: (resData) => {
          console.log(resData);
          this.activeModal.close(resData);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Updating Guesthouse failed. Please try again.';
        },
        complete: () => console.log('Updating Guesthouse completed'),
      });
    } else {
      console.log('login Data:', loginData);

      this.modalService.addGuesthouse(loginData).subscribe({
        next: (resData) => {
          console.log(resData);
          this.activeModal.close(resData);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Adding new Guesthouse failed. Please try again.';
        },
        complete: () => console.log('Adding new Guesthose completed'),
      });

      this.form.reset();
    }
  }
  close() {
    this.activeModal.dismiss();
  }
}
