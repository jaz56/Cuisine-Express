import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-ingredient-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.css']
})
export class IngredientSearchComponent implements OnInit {
  ingredientInput = '';
  userIngredients: string[] = [];
  commonIngredients: string[] = [];
  suggestions: string[] = [];
  showSuggestions = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getUserIngredients().subscribe(ingredients => {
      this.userIngredients = ingredients;
    });

    this.recipeService.getCommonIngredients().subscribe(ingredients => {
      this.commonIngredients = ingredients;
    });
  }

  onIngredientInput() {
    if (this.ingredientInput.length < 2) {
      this.showSuggestions = false;
      return;
    }

    this.suggestions = this.commonIngredients
      .filter(ingredient =>
        ingredient.toLowerCase().includes(this.ingredientInput.toLowerCase()) &&
        !this.userIngredients.includes(ingredient.toLowerCase())
      )
      .slice(0, 5);

    this.showSuggestions = this.suggestions.length > 0;
  }

  addIngredient() {
    const ingredient = this.ingredientInput.trim().toLowerCase();
    if (ingredient && !this.userIngredients.includes(ingredient)) {
      this.recipeService.addUserIngredient(ingredient);
      this.ingredientInput = '';
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: string) {
    this.ingredientInput = suggestion;
    this.showSuggestions = false;
    this.addIngredient();
  }

  removeIngredient(ingredient: string) {
    this.recipeService.removeUserIngredient(ingredient);
  }

  showRandomRecipe() {
    if (this.userIngredients.length === 0) {
      alert("Veuillez ajouter des ingrédients d'abord!");
      return;
    }

    const randomRecipe = this.recipeService.getRandomRecipe(this.userIngredients);
    if (randomRecipe) {
    } else {
      alert("Aucune recette ne correspond à vos ingrédients. Essayez d'en ajouter plus!");
    }
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}
