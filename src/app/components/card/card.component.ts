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
  @Output() quantityModified = new EventEmitter<BookModel>();

  imageUrl: string = "";

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

  modifyBook() {
    this.updateBook.emit(this.book);
  }

  delBook() {
    this.deleteBook.emit(this.book);
  }


  async ngOnInit() {  
    try{
      this.imageUrl = URL.createObjectURL(await fromURL(this.book?.image as string, 100, 128, 128, "jpeg"));
    }
    catch {
      this.imageUrl = './no-cover.png';
    }
  }

}
