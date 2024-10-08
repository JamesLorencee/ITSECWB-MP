import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() hasIcon = true;
  @Input() hasHeader = false;
  @Input() headerName = '';
  @Input() iconName = 'matDatasetOutline';
  @Output() eventToggleModal: EventEmitter<boolean> = new EventEmitter();

  closeModal() {
    this.isOpen = false;
    this.eventToggleModal.emit(this.isOpen);
  }
}
