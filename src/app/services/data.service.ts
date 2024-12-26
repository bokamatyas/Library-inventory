import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // CREATE
  addBook(_book: BookModel) {

  }
  // READ
  getBooks() {

  }
  // UPDATE
  modifyBook() {

  }
  // DELETE
  deleteBook() {

  }
}
