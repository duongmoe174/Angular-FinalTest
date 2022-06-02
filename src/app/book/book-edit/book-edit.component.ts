import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl(),
  })
  id: number | undefined;

  constructor(private bookService: BookService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paraMap) => {
      // @ts-ignore
      this.id = +paraMap.get('id');
      this.getBookById(this.id);
    })
  }

  ngOnInit(): void {
  }

  getBookById(id: number) {
    return this.bookService.getBookById(id).subscribe((book) => {
      this.bookForm = new FormGroup({
        title: new FormControl(book.title),
        author: new FormControl(book.author),
        description: new FormControl(book.description)
      })
    })
  }


  onSubmitEdit() {
    this.bookService.editBook(this.id, this.bookForm.value).subscribe(() => {
      alert('success');
      this.router.navigate(['/book']);
    })
  }
}
