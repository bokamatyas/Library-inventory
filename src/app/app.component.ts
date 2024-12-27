import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookModel } from './models/book-model';
import { DataService } from './services/data.service';
import { CardListComponent } from './components/card-list/card-list.component';
import { BookDataComponent } from "./components/book-data/book-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardListComponent, BookDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'library-catalogue';
  @Input() bookData: BookModel | undefined = undefined;

  books: BookModel[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooks().subscribe({
      next: (_data: BookModel[]) => { this.books = _data },
      error: (_err) => console.log(_err)
    });
  }

  newBook(){

  }

  modifyBook(_book: BookModel){
    this.dataService.updateBook(_book).subscribe({
      next: (_result: BookModel) => {
        this.books[this.books.findIndex(b => b.id = _book.id)] = _result
        this.bookData = undefined;
      },
      error: (_err) =>console.log(_err)
    });
  }

  deleteBook(_book: BookModel) {
    this.dataService.deleteBook(_book).subscribe({
      next: (_result: BookModel) => {
        this.books.splice(this.books.findIndex(b => b.id = _book.id, 1));
      },
      error: (_err) => console.log(_err)
    })
  }
}
