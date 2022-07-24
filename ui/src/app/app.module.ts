import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component'
import { AddCandyComponent } from './addCandy/addCandy.component';
import { AddCategorieComponent } from './addCategorie/addCategorie.component';
import { ListCandyComponent } from './listCandy/listCandy.component';
import { ListCategorieComponent } from './listCategorie/listCategorie.component';
import { EditCandyComponent } from './editCandy/editCandy.component';
import { EditCategorieComponent } from './editCategorie/editCategorie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [									
    AppComponent,
    AdminComponent,
    HomeComponent,
    AddCandyComponent,
    AddCategorieComponent,
    ListCandyComponent,
    ListCategorieComponent,
    EditCandyComponent,
    EditCategorieComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 
}
