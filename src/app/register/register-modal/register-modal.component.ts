import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }
}
