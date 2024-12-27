import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  #url = "http://localhost:3000/books";

  constructor(private http: HttpClient) { }

  // CREATE
  createBook(_book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(this.#url, _book);
  }
  // READ
  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(this.#url);
  }
  // UPDATE
  updateBook(_book: BookModel): Observable<BookModel> {
    return this.http.put<BookModel>(`${this.#url}/${_book.id}`, _book);
  }
  // DELETE
  deleteBook(_book: BookModel): Observable<BookModel> {
    return this.http.delete<BookModel>(`${this.#url}/${_book.id}`);
  }
}
