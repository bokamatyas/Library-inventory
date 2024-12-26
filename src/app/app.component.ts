import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookModel } from './models/book-model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'library-catalogue';

  books: BookModel[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBooks().subscribe({
      next: (_data: BookModel[]) => { this.books = _data },
      error: (_err) => console.log(_err)
    });
  }
}
