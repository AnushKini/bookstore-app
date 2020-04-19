import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule, routes } from './book-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { GetBookComponent } from './get-book/get-book.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, CreateBookComponent, GetBookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ]
})
export class BookModule { }
