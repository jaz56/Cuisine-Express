import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery = '';
  suggestions: string[] = [];
  showSuggestions = false;
  allRecipeNames: string[] = [];

  constructor(private recipeService: RecipeService) {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.allRecipeNames = recipes.map(r => r.name);
    });
  }

  onSearchInput() {
    if (this.searchQuery.length === 0) {
      this.showSuggestions = false;
      return;
    }

    this.suggestions = this.allRecipeNames
      .filter(name => name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .slice(0, 5);

    this.showSuggestions = this.suggestions.length > 0;
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.onSearch();
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      const results = this.recipeService.searchRecipesByName(this.searchQuery);
    }
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}
