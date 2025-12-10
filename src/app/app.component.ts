import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IngredientSearchComponent } from './components/ingredient-search/ingredient-search.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeModalComponent } from './components/recipe-modal/recipe-modal.component';
import { Recipe } from './models/recipe.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    IngredientSearchComponent,
    RecipeListComponent,
    RecipeModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedRecipe: Recipe | null = null;
  isModalOpen = false;
  isDarkMode = false;

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedRecipe = null;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
