import { BookService } from './../services/book-service.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { ToastrModule, ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrls: ['./get-book.component.css']
})
export class GetBookComponent implements OnInit {

  bookList: Array<Book> = [];
  bookIdToBeUpdated: number;
  updateBookForm = new FormGroup({
    bookName: new FormControl(),
    author: new FormControl(),
    category: new FormControl(),
    publication: new FormControl(),
    price: new FormControl(),
  });
  constructor(private bookService: BookService, public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      (res) => {
        this.bookList = res.body as any;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id: number) {
    this.bookService.deleteBook(id).subscribe(
      (res) => {
        this.toastr.successToastr('Book Deleted!!', 'Success!');
        for (let i = 0; i < this.bookList.length; i++) {
          if (this.bookList[i].id === id) {
            this.bookList.splice(i, 1);
          }
        }
      },
      (err) => {
        this.toastr.errorToastr('Error', 'Error!');
      }
    );
  }

  update(book: Book) {
    this.updateBookForm = new FormGroup({
      bookName: new FormControl(book.name),
      author: new FormControl(book.author),
      category: new FormControl(book.category),
      publication: new FormControl(book.publication),
      price: new FormControl(book.price),
    });
    this.bookIdToBeUpdated = book.id;
  }

  updateBook() {
    const book = new Book();
    book.name = this.updateBookForm.controls.bookName.value;
    book.author = this.updateBookForm.controls.author.value;
    book.category = this.updateBookForm.controls.category.value;
    book.publication = this.updateBookForm.controls.publication.value;
    book.price = this.updateBookForm.controls.price.value;

    this.bookService.updateBook(this.bookIdToBeUpdated, book).subscribe(
      (res) => {
        this.toastr.successToastr('Book Updated', 'Success!');
        this.updateBookForm.reset();
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.toastr.errorToastr('Error', 'Error!');
      }
    );
  }

}
