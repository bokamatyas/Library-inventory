import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../../models/book-model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input() books: BookModel[] = [];
  @Output() bookModified = new EventEmitter<BookModel>();
  @Output() quantityModified = new EventEmitter<BookModel>();

  modifyBook(_book: BookModel) {  
    this.bookModified.emit(_book);
  }

  modifyQuantity(_book: BookModel){
    this.quantityModified.emit(_book);
  }
}
