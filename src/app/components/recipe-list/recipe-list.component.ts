import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  matchingRecipes: Recipe[] = [];
  almostMatchingRecipes: Array<Recipe & { missingIngredient: string }> = [];
  showNoResults = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getUserIngredients().subscribe(userIngredients => {
      this.updateRecipes(userIngredients);
    });

    this.recipeService.getRecipes().subscribe(() => {
      this.recipeService.getUserIngredients().subscribe(userIngredients => {
        this.updateRecipes(userIngredients);
      });
    });
  }

  updateRecipes(userIngredients: string[]) {
    if (userIngredients.length === 0) {
      this.recipeService.getRecipes().subscribe(recipes => {
        this.matchingRecipes = recipes;
        this.almostMatchingRecipes = [];
        this.showNoResults = false;
      });
      return;
    }

    const { matching, almostMatching } = this.recipeService.filterRecipesByIngredients(userIngredients);
    this.matchingRecipes = matching;
    this.almostMatchingRecipes = almostMatching;
    this.showNoResults = matching.length === 0 && almostMatching.length === 0;
  }

  onRecipeClick(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
