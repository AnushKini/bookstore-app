import { BookService } from './../services/book-service.service';
import { Book } from './../../../models/book';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrModule, ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private bookService: BookService, public toastr: ToastrManager) { }

  createForm = new FormGroup({
    bookName: new FormControl(),
    author: new FormControl(),
    category: new FormControl(),
    publication: new FormControl(),
    price: new FormControl(),
  });

  ngOnInit(): void {
  }

  addBook() {
    const book = new Book();
    book.name = this.createForm.controls.bookName.value;
    book.author = this.createForm.controls.author.value;
    book.category = this.createForm.controls.category.value;
    book.publication = this.createForm.controls.publication.value;
    book.price = this.createForm.controls.price.value;

    this.bookService.createBook(book).subscribe(
      (res) => {
        this.toastr.successToastr('Book Created', 'Success!');
        this.createForm.reset();
      },
      (err) => {
        console.log(err);
        this.toastr.errorToastr('Error', 'Error!');
      }
    );
  }

}
