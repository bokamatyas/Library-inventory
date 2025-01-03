import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookModel } from './models/book-model';
import { DataService } from './services/data.service';
import { CardListComponent } from './components/card-list/card-list.component';
import { BookDataComponent } from "./components/book-data/book-data.component";
import { fromURL, blobToURL } from 'image-resize-compress';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardListComponent, BookDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'library-inventory';
  newBookData: BookModel | undefined = undefined;
  modBookData: BookModel | undefined = undefined;

  books: BookModel[] = [];
  filteredBooks: BookModel[] = [];
  filterParameter: string = "";

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooks().subscribe({
      next: (_data: BookModel[]) => { 
        this.books = _data; 
        this.filteredBooks = this.books;
      },
      error: (_err) => console.log(_err)
    });
  }

  newBook(){
    this.newBookData = {
      id: undefined,
      isbn: "",
      title: "",
      author: "",
      release_date: "",
      genres: [],
      length: 0,
      available: 0,
      image: ""
    }
  }

  setBookData(_book: BookModel){
    this.modBookData = structuredClone(_book);
  }

  createBook(_book: BookModel) {
    this.dataService.createBook(_book).subscribe({
      next: (_result: BookModel) => {
        this.books.push(_result);
        this.newBookData = undefined;
        this.filter(this.filterParameter);
      },
      error: (_err) => console.log(_err)
    });
  }

  async updateBook(_book: BookModel){  
    _book.image = await blobToURL(await fromURL(_book.image as string));
    this.dataService.updateBook(_book).subscribe({
      next: (_result: BookModel) => {
        const index: number = this.books.findIndex(b => b.id == _result.id);
        this.books[index] = _result
        this.modBookData = undefined;
        this.filter(this.filterParameter);
      },
      error: (_err) =>console.log(_err)
    });
  }

  deleteBook(_book: BookModel) {
    this.dataService.deleteBook(_book).subscribe({
      next: (_result: BookModel) => {
        const index: number = this.books.findIndex(b => b.id == _result.id);
        this.books.splice(index, 1);
        this.filter(this.filterParameter);                
      },
      error: (_err) => console.log(_err)
    });
  }

  async patchBook(_changes: {id: string, available: number}) {
    this.dataService.patchBook(_changes).subscribe({
      next: (_result: BookModel) =>{
        const index: number = this.books.findIndex(b => b.id == _result.id);
        this.books[index].available = _changes.available;
        this.modBookData = undefined;
        this.filter(this.filterParameter);
      },
      error: (_err) =>console.log(_err)
    })
  }

  filterBooks(_event: any){
    this.filterParameter = _event.target.value;
    this.filter(this.filterParameter);        
  }

  private filter(_parameter: string){
    this.filteredBooks = this.books.filter(b => 
      b.title.toLocaleLowerCase().startsWith(_parameter.toLocaleLowerCase()) || 
      b.isbn.toLocaleLowerCase().startsWith(_parameter.toLocaleLowerCase()));   
  }
}
