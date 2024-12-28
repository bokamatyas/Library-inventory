import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../../models/book-model';
import { fromURL, blobToURL } from 'image-resize-compress';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() book: BookModel | undefined;
  @Output() updateBook = new EventEmitter<BookModel>();
  @Output() deleteBook = new EventEmitter<BookModel>();
  @Output() quantityModified = new EventEmitter<{id: string, available: number}>();

  async addQuantity(){
    this.quantityModified.emit({ id: this.book!.id!, available: this.book!.available+1 });
  }

  async subtractQuantity() {
    if(this.book?.available != 0){
      this.quantityModified.emit({ id: this.book!.id!, available: this.book!.available-1 });
    }
  }

  modifyBook() {
    this.updateBook.emit(this.book);
  }

  delBook() {
    this.deleteBook.emit(this.book);
  }

  async ngOnInit() {  
    try{
      this.book!.image = URL.createObjectURL(await fromURL(this.book?.image as string, 100, 200, 200, "webp"));
    }
    catch {
      this.book!.image = './no-cover.png';
    }
  }

}
