import { Component, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModal {
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  close() {
    this.activeModal.dismiss('cancel');
  }
  confirm() {
    this.activeModal.close('confirm');
  }
}
