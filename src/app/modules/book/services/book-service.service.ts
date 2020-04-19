import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from '../../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.restApi;

  constructor(private http: HttpClient, private router: Router) { }

  createBook(book: Book): Observable<HttpResponse<Book>> {
    return this.http.post<Book>(
      this.baseUrl + '/books', book, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      });
  }

  getAllBooks(): Observable<HttpResponse<Book[]>> {
    return this.http.get<Book[]>(this.baseUrl + '/books', { observe: 'response' });
  }

  deleteBook(bookId: number) {

    // // Adding Params
    // let params = new HttpParams();
    // params = params.append('id', bookId);

    return this.http.delete<HttpResponse<any>>(this.baseUrl + '/books/' + bookId,
      { observe: 'response' });
  }

  updateBook(id: number, book: Book): Observable<HttpResponse<Book>> {
    return this.http.put<Book>(
      this.baseUrl + '/books/' + id, book, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      });
  }
}
