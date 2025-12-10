export interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  difficulty: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

export interface CommonIngredient {
  name: string;
}
