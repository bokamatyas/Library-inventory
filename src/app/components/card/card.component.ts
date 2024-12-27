import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../../models/book-model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() book: BookModel | undefined;
  @Output() bookModified = new EventEmitter<BookModel>();
  @Output() quantityModified = new EventEmitter<BookModel>();

  addQuantity(){
    this.book!.available++;
    this.quantityModified.emit(this.book);
  }

  subtractQuantity() {
    if(this.book?.available != 0){
      this.book!.available--
      this.quantityModified.emit(this.book);
    }
  }
}
