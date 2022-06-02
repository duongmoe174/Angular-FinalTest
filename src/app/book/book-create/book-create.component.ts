import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl(),
  })

  constructor(private router: Router, private bookService: BookService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.bookService.createNewBook(this.bookForm.value).subscribe(() => {
      alert('success')
    })
  }
}
