import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../../models/book-model';

@Component({
  selector: 'app-book-data',
  standalone: true,
  imports: [],
  templateUrl: './book-data.component.html',
  styleUrl: './book-data.component.css'
})
export class BookDataComponent {
  @Input() bookData: BookModel | undefined = undefined;
  @Output() saved = new EventEmitter<BookModel>();

  cancel() {
    this.bookData = undefined;
  }

  save() {
    this.saved.emit(this.bookData);
  }

  getData(event: any): string{
    return event.target.value;
  }

  getNumberData(event: any): number {
    return +event.target.value;
  }

}
