import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent {
  @Input() recipe: Recipe | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.onClose();
    }
  }
}
