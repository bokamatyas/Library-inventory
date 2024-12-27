import { Component, Input } from '@angular/core';
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

  cancel() {

  }

  save() {

  }

  getData(event: Event): string{
    return ""
  }

  getNumberData(event: Event): number {
    return 0
  }

}
