import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) {
this.activatedRoute.paramMap.subscribe((paraMap) => {
  const id = paraMap.get('id');
  this.deleteBook(id);
})
  }

  ngOnInit(): void {
  }
deleteBook(id: any) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.router.navigate(['/book']);
      });
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.router.navigate(['/book']);
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      );
    }
  });
}
}
