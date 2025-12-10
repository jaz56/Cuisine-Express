import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes$ = new BehaviorSubject<Recipe[]>([]);
  private userIngredients$ = new BehaviorSubject<string[]>([]);
  private commonIngredients$ = new BehaviorSubject<string[]>([]);

  constructor(private supabase: SupabaseService) {
    this.loadRecipes();
    this.loadCommonIngredients();
    this.loadUserIngredients();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes$.asObservable();
  }

  getUserIngredients(): Observable<string[]> {
    return this.userIngredients$.asObservable();
  }

  getCommonIngredients(): Observable<string[]> {
    return this.commonIngredients$.asObservable();
  }

  async loadRecipes() {
    const { data, error } = await this.supabase.client
      .from('recipes')
      .select('*');

    if (error) {
      console.error('Error loading recipes:', error);
      return;
    }

    if (data) {
      this.recipes$.next(data);
    }
  }

  async loadCommonIngredients() {
    const { data, error } = await this.supabase.client
      .from('common_ingredients')
      .select('name')
      .order('name');

    if (error) {
      console.error('Error loading common ingredients:', error);
      return;
    }

    if (data) {
      this.commonIngredients$.next(data.map(item => item.name));
    }
  }

  async loadUserIngredients() {
    const saved = localStorage.getItem('userIngredients');
    if (saved) {
      this.userIngredients$.next(JSON.parse(saved));
    }
  }

  addUserIngredient(ingredient: string) {
    const current = this.userIngredients$.value;
    if (!current.includes(ingredient.toLowerCase())) {
      const updated = [...current, ingredient.toLowerCase()];
      this.userIngredients$.next(updated);
      localStorage.setItem('userIngredients', JSON.stringify(updated));
    }
  }

  removeUserIngredient(ingredient: string) {
    const current = this.userIngredients$.value;
    const updated = current.filter(ing => ing !== ingredient);
    this.userIngredients$.next(updated);
    localStorage.setItem('userIngredients', JSON.stringify(updated));
  }

  clearUserIngredients() {
    this.userIngredients$.next([]);
    localStorage.removeItem('userIngredients');
  }

  filterRecipesByIngredients(userIngredients: string[]): { matching: Recipe[], almostMatching: Array<Recipe & { missingIngredient: string }> } {
    const allRecipes = this.recipes$.value;

    if (userIngredients.length === 0) {
      return { matching: allRecipes, almostMatching: [] };
    }

    const matching = allRecipes.filter(recipe => {
      return recipe.ingredients.every(ingredient =>
        userIngredients.some(userIng => ingredient.toLowerCase().includes(userIng.toLowerCase()))
      );
    });

    const almostMatching = allRecipes
      .filter(recipe => !matching.includes(recipe))
      .map(recipe => {
        const missingIngredients = recipe.ingredients.filter(ingredient =>
          !userIngredients.some(userIng => ingredient.toLowerCase().includes(userIng.toLowerCase()))
        );

        if (missingIngredients.length === 1) {
          return { ...recipe, missingIngredient: missingIngredients[0] };
        }
        return null;
      })
      .filter((recipe): recipe is Recipe & { missingIngredient: string } => recipe !== null);

    return { matching, almostMatching };
  }

  searchRecipesByName(query: string): Recipe[] {
    const allRecipes = this.recipes$.value;
    if (!query) return allRecipes;

    return allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getRandomRecipe(userIngredients: string[]): Recipe | null {
    const { matching, almostMatching } = this.filterRecipesByIngredients(userIngredients);
    const recipesToChoose = matching.length > 0 ? matching : almostMatching;

    if (recipesToChoose.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * recipesToChoose.length);
    return recipesToChoose[randomIndex];
  }
}
