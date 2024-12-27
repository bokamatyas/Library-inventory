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
  @Input() book: BookModel | undefined
  @Output() add = EventEmitter<void>
  @Output() subtract = EventEmitter<void>

  addQuantity(){
  }

  subtractQuantity() {
  }
}
