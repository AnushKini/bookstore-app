import { CreateBookComponent } from './modules/book/create-book/create-book.component';
import { HomeComponent } from './modules/book/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Lazy Loaded Routing for Book Module
const bookRoute = {
  path: '',
  loadChildren: './modules/book/book.module#BookModule'
};

const routes: Routes = [
  { path: '' , redirectTo: 'book', pathMatch: 'full' },
  bookRoute
  // {
  //   path: '',
  //   component: CreateBookComponent
  // }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule { }
