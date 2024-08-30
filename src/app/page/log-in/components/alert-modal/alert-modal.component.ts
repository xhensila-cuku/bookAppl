import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {
@Output() close = new EventEmitter<void>();

onClose(){
  this.close.emit();
}
}
