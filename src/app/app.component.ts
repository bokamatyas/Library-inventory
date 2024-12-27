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

  modifyBook(_inBook: BookModel) {
    this.bookData = _inBook;
    console.log(this.bookData);
    
  }
}
