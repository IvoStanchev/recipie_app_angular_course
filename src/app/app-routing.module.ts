//Import Ng module to make this a valid Angular module.
import { NgModule } from '@angular/core';

//The RouterModule is used for handling the Routes array which contains all of our paths.
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Here we import each component so it can be used for each route.

//This are the Routes, we use those to load certain pages.
const appRoutes: Routes = [
  //A route takes a path and a location that needs to be loaded, we can either Redirect to a page or provide a file to load.
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //==> Path match full is used to account for and empty path '', otherwise Angular will match every path.

  //! Here are two ways to start lazy loading.
  // { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

//NgModule is needed to import our routes and use them in our Angular app.
//We need to export the RouterModule so we can then import this in the app.module.ts and set this file as our router.
//PRELOAD is used to lazy load modules.
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
