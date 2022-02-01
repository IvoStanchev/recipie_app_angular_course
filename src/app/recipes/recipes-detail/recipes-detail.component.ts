import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    //ActivatedRoute is used to fetch the current inforamtion for the query params provided by the router.URL
    private route: ActivatedRoute,
    //This router is needed for the navigation.
    private router: Router
  ) {}

  ngOnInit(): void {
    //Fetch the current snapshot(state) of the route and get the required information. This information cannot be changed so if used on a page that requires the content to change, this is not a good solution. THIS IS USED FOR SINGLE LOADING ONLY.
    //const id = this.route.snapshot.params['id'];

    //This method is used when we expect changes in the content of the page. We subscribe to the params OBSERVABLE where we expect the params from the URL, then we set the value to our variable.
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(params);
      //We fetch the recipe by using the getRecipe() method in the recipe service, which takes an ID and fetches the recipe from the Recipes array by index and returns it.
      //We use the Recipe model to store the recipe.
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onEditRecipe() {
    //IMPORTANT: We redirect the application to the edit page, HOWEVER, take notice of the current path, it is localhost:4200:/recipes/:id this is quite handy since we can only append the edit param at the end of the URL and this will set the edit page for the currently selected recipe.

    //OF course this needs to be done by setting the relativeTo method to the current route.
    this.router.navigate(['edit'], { relativeTo: this.route });

    //ALTERNATIVE
    //Here we go back one level to /recipes then we add the ID and at the end we add edit. RECIPES/ID/EDIT. We then set this created path to the relative of the current page.
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
