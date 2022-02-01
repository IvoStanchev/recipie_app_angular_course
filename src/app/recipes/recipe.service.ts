import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Burger',
  //     'Life is not the same after this one.',
  //     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sonomamag.com%2Fwp-content%2Fuploads%2F2017%2F05%2FWISHBONE_TILTEDBURGER_CH-1.jpg&f=1&nofb=1',
  //     [new Ingredient('Meat', 1), new Ingredient('Friench Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Eggs on bread.',
  //     'The best possible breakfast.',
  //     'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  //     [
  //       new Ingredient('Bread', 1),
  //       new Ingredient('Avocado', 1),
  //       new Ingredient('eggs', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Dry Aged Beef Steak',
  //     'Looking for the best? Look no further...',
  //     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fgrub%2F2016%2F04%2F07%2F09-the-dutch-steak.w710.h473.2x.jpg&f=1&nofb=1',
  //     [
  //       new Ingredient('Steak Dry Aged', 1),
  //       new Ingredient('Pepper', 1),
  //       new Ingredient('Sea Salt', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  //Fetch a single recipe by providing an ID from the ROUTER query, then return that recipe from an array by its index.
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
