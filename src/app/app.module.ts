//This is are modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { state, style, trigger } from '@angular/animations';

//All components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

//This is a service
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

//Animations

//Here we declare all of our components.
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  //Here we set all of our modules.
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ? We remove the bellow due to LAZY LOADING.
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    CoreModule,
  ],
  //Here we add all services.
  providers: [],
  //????
  bootstrap: [AppComponent],
})
export class AppModule {}
